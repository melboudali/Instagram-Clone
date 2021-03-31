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
import { getRepository } from "typeorm";
import { v2 as cloudinary } from "cloudinary";
import {
	CLOUDINARY_CONFIG,
	image_author,
	image_data,
	image_res,
	image_upload_response,
	images
} from "../models/images";
import { Like } from "../entities/like";

@Resolver(Image)
export class ImageResolver {
	// Queries
	@Query(() => images)
	@UseMiddleware(isAuth)
	async getAllImages(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: MyContext
	): Promise<images> {
		const minLimit = Math.min(50, limit);
		const minLimitPlusOne = minLimit + 1;
		// const userId = req.session.user_id;

		// const queryParams: (number | Date | undefined)[] = [minLimitPlusOne];
		// if (userId) {
		// 	queryParams.push(userId);
		// }
		// let cursorId = 3;
		// if (cursor) {
		// 	queryParams.push(new Date(parseInt(cursor)));
		// 	cursorId = queryParams.length;
		// }

		// const images = await getConnection().query(
		// 	`
		// select i.*,
		// (select "imageId" from "like" where "userId" = $2 and "imageId" = i.id) like_status
		// from image i
		// ${cursor ? `where i.created_at < $${cursorId}` : ""}
		// order by i.created_at DESC
		// limit $1
		// `,
		// 	queryParams
		// );
		const getRepo = cursor
			? getRepository(Image)
					.createQueryBuilder("image")
					.leftJoinAndSelect("image.like", "like", "like.imageId = id AND like.userId = :userId", {
						userId: req.session.user_id
					})
					.where(`image.created_at < :cursor`, {
						cursor: new Date(parseInt(cursor))
					})
					.orderBy("image.created_at", "DESC")
					.limit(minLimitPlusOne)
					.getMany()
			: getRepository(Image)
					.createQueryBuilder("image")
					.leftJoinAndSelect("image.like", "like", "like.imageId = id AND like.userId = :userId", {
						userId: req.session.user_id
					})
					.orderBy("image.created_at", "DESC")
					.limit(minLimitPlusOne)
					.getMany();

		const images = await getRepo;

		return { images: images.slice(0, minLimit), hasMore: images.length === minLimitPlusOne };
	}

	@Query(() => images)
	async getUserImages(
		@Arg("userId", () => Int) userId: number,
		@Arg("isPrivate", () => Boolean) isPrivate: boolean,
		@Arg("isDisabled", () => Boolean) isDisabled: boolean,
		@Arg("currentUserId", () => Int, { nullable: true }) currentUserId: number | null,
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null
	): Promise<images> {
		if ((isPrivate || isDisabled) && (!currentUserId || currentUserId !== userId)) {
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

	@Query(() => image_res)
	async getImage(@Arg("imageId") imageId: string): Promise<image_res> {
		if (imageId) {
			const res = await getRepository(Image)
				.createQueryBuilder("image")
				.leftJoinAndSelect("image.like", "like")
				.where("image.id = :imageId", { imageId })
				.getOne();

			if (res) {
				console.log(res);
				return { image: res };
			} else {
				return { error: { message: "error" } };
			}
		} else {
			return { error: { message: "Image not found!" } };
		}
	}

	// Mutations
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

			cloudinary.config(CLOUDINARY_CONFIG);

			createReadStream().pipe(
				cloudinary.uploader.upload_stream(
					{ folder: process.env.CLOUDINARY_FOLDER },
					async (error, result) => {
						if (error) {
							reject({ error: { message: error.message } });
						}
						const post = await Image.create({
							userId: req.session.user_id,
							caption,
							image_url: result?.secure_url
						}).save();
						resolve({ image: post });
					}
				)
			);
		});
	}

	@FieldResolver(() => image_author)
	user(@Root() image: Image, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(image.userId);
	}
}
