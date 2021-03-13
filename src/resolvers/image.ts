import "dotenv/config";
import {
	Resolver,
	Mutation,
	Arg,
	UseMiddleware,
	Ctx,
	Query,
	Int,
	FieldResolver,
	Root
} from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Image } from "../entities/image";
import { isAuth } from "../middleware/isAuthenticated";
import { MyContext } from "../types";
import { getConnection } from "typeorm";
import { v2 as cloudinary } from "cloudinary";
import {
	cloudinaryConfig,
	image_author,
	image_data,
	image_upload_response,
	PaginatedImages
} from "../models/images";

@Resolver(Image)
export class ImageResolver {
	@Mutation(() => image_upload_response)
	@UseMiddleware(isAuth)
	async uploadImage(
		@Arg("file", () => GraphQLUpload) { createReadStream }: FileUpload,
		@Arg("caption") caption: string,
		@Ctx() { req }: MyContext
	): Promise<image_upload_response> {
		return new Promise((resolve, reject) => {
			if (!caption || caption.length <= 3) {
				reject({ error: { message: "Title should be greater than 3!" } });
				return;
			}

			const userId = req.session.user_id;

			cloudinary.config(cloudinaryConfig);

			createReadStream().pipe(
				cloudinary.uploader.upload_stream(
					{ folder: process.env.CLOUDINARY_FOLDER },
					async (error, result) => {
						if (error) {
							reject({ error: { message: error.message } });
						}
						const image_url = result?.secure_url;
						const post = await Image.create({
							userId,
							caption,
							image_url
						}).save();
						resolve({ image: post });
					}
				)
			);
		});
	}

	@Query(() => PaginatedImages)
	@UseMiddleware(isAuth)
	async getAllImages(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: MyContext
	): Promise<PaginatedImages> {
		const minLimit = Math.min(50, limit);
		const minLimitPlusOne = minLimit + 1;
		const userId = req.session.user_id;

		const queryParams: (number | Date)[] = [minLimitPlusOne];
		if (userId) {
			queryParams.push(userId);
		}
		let cursorId = 3;
		if (cursor) {
			queryParams.push(new Date(parseInt(cursor)));
			cursorId = queryParams.length;
		}

		const images = await getConnection().query(
			`
		select i.*, 
		(select "imageId" from "like" where "userId" = $2 and "imageId" = i.id) like_status
		from image i
		${cursor ? `where i.created_at < $${cursorId}` : ""}
		order by i.created_at DESC
		limit $1
		`,
			queryParams
		);

		return { images: images.slice(0, minLimit), hasMore: images.length === minLimitPlusOne };
	}

	@Query(() => PaginatedImages)
	async getUserImages(
		@Arg("userId", () => Int) userId: number,
		@Arg("isPrivate", () => Boolean) isPrivate: boolean,
		@Arg("isDisabled", () => Boolean) isDisabled: boolean,
		@Arg("currentUserId", () => Int) currentUserId: number,
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<PaginatedImages> {
		if ((isPrivate || isDisabled) && currentUserId !== userId) {
			return { images: [], hasMore: false };
		}
		const minLimit = Math.min(50, limit);
		const minLimitPlusOne = minLimit + 1;
		let images: image_data[] = [];
		if (cursor) {
			images = await Image.createQueryBuilder()
				.where('"userId" = :userId', { userId: userId })
				.where("created_at < :newcursor", { newcursor: new Date(parseInt(cursor)) })
				.orderBy("created_at", "DESC")
				.limit(minLimitPlusOne)
				.getMany();
		} else {
			images = await Image.createQueryBuilder()
				.where('"userId" = :userId', { userId: userId })
				.orderBy("created_at", "DESC")
				.limit(minLimitPlusOne)
				.getMany();
		}

		return { images: images.slice(0, minLimit), hasMore: images.length === minLimitPlusOne };
	}

	@FieldResolver(() => image_author)
	user(@Root() image: Image, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(image.userId);
	}
}
