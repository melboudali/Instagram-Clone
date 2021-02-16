import "dotenv/config";
import {
	Resolver,
	Mutation,
	Arg,
	ObjectType,
	Field,
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

@ObjectType()
class image_author {
	@Field()
	id!: number;
	@Field()
	username!: string;
	@Field()
	image_link!: string;
}

@ObjectType()
class image_data extends Image {
	@Field()
	id!: string;
	@Field()
	caption!: string;
	@Field()
	image_url!: string;
	@Field()
	likes!: number;
	@Field({ nullable: true })
	like_status!: string;
	@Field(() => String)
	created_at!: Date;
}

@ObjectType()
class image_error {
	@Field()
	field!: string;
	@Field()
	message!: string;
}

@ObjectType()
class image_upload_response {
	@Field(() => image_data, { nullable: true })
	image?: image_data;
	@Field(() => image_error, { nullable: true })
	error?: image_error;
}

@ObjectType()
class PaginatedImages {
	@Field(() => [image_data])
	images!: image_data[];
	@Field(() => Boolean, { nullable: true })
	hasMore!: boolean;
}

@Resolver(Image)
export class ImageResolver {
	@Mutation(() => image_upload_response)
	@UseMiddleware(isAuth)
	async uploadImage(
		@Arg("file", () => GraphQLUpload) { createReadStream }: FileUpload,
		@Arg("caption") caption: string,
		@Ctx() { req }: MyContext
	): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!caption || caption.length <= 3) {
				reject({ error: { message: "Title should be greater than 3!" } });
			}

			const userId = req.session.user_id;

			cloudinary.config({
				cloud_name: process.env.CLOUD_NAME,
				api_key: process.env.API_KEY,
				api_secret: process.env.API_SECRET
			});

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

	@FieldResolver(() => image_author)
	user(@Root() image: Image, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(image.userId);
	}
}
