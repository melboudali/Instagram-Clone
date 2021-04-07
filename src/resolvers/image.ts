import { Resolver, Mutation, Arg, UseMiddleware, Ctx, Query, Int, FieldResolver, Root } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Image } from "../entities/image";
import { isAuth } from "../middleware/isAuthenticated";
import { MyContext } from "../types";
import { getRepository } from "typeorm";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CONFIG, image_author, image_res, image_upload_response, images } from "../models/images";

@Resolver(Image)
export class ImageResolver {
	@Query(() => images)
	@UseMiddleware(isAuth)
	async getAllImages(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: MyContext
	): Promise<images> {
		const minLimit = Math.min(50, limit);
		const minLimitPlusOne = minLimit + 1;

		const leftJoinWithCursor = () => {
			let getImageRepository = getRepository(Image)
				.createQueryBuilder("image")
				.leftJoinAndSelect("image.like", "like", "like.imageId = id AND like.userId = :userId", {
					userId: req.session.user_id
				});
			if (cursor) {
				return getImageRepository.where(`image.created_at < :cursor`, {
					cursor: new Date(parseInt(cursor))
				});
			}
			return getImageRepository;
		};

		const images = await leftJoinWithCursor().orderBy("image.created_at", "DESC").limit(minLimitPlusOne).getMany();

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

		const createImageQueryBuilder = () => {
			const ImageQueryBuilder = Image.createQueryBuilder().where('"userId" = :userId', { userId: userId });
			if (cursor) {
				return ImageQueryBuilder.andWhere("created_at < :newcursor", { newcursor: new Date(parseInt(cursor)) });
			}
			return ImageQueryBuilder;
		};

		const images = await createImageQueryBuilder().orderBy("created_at", "DESC").limit(minLimitPlusOne).getMany();

		return { images: images.slice(0, minLimit), hasMore: images.length === minLimitPlusOne };
	}

	@Query(() => image_res)
	async getImage(@Arg("imageId") imageId: string): Promise<image_res> {
		let res: Image | undefined;

		try {
			res = await getRepository(Image)
				.createQueryBuilder("image")
				.leftJoinAndSelect("image.like", "like")
				.where("image.id = :imageId", { imageId })
				.getOne();
		} catch (error) {
			return { error: { message: "Image not found!" } };
		}

		return { image: res };
	}

	@Mutation(() => image_upload_response)
	@UseMiddleware(isAuth)
	async uploadImage(
		@Arg("file", () => GraphQLUpload) { createReadStream }: FileUpload,
		@Arg("caption") caption: string,
		@Ctx() { req }: MyContext
	): Promise<image_upload_response> {
		return new Promise((resolve, reject) => {
			if (!caption || caption.length <= 6) {
				reject({ error: { message: "Title should be greater than 5!" } });
				return;
			}

			cloudinary.config(CLOUDINARY_CONFIG);

			createReadStream().pipe(
				cloudinary.uploader.upload_stream({ folder: process.env.CLOUDINARY_FOLDER }, async (error, result) => {
					if (error) {
						reject({ error: { message: error.message } });
					}
					const post = await Image.create({
						userId: req.session.user_id,
						caption,
						image_url: result?.secure_url
					}).save();
					resolve({ image: post });
				})
			);
		});
	}

	@FieldResolver(() => image_author)
	user(@Root() image: Image, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(image.userId);
	}
}
