import { User } from "../entities/user";
import { Field, ObjectType } from "type-graphql";
import { Like } from "../entities/like";
import { Image } from "../entities/image";

@ObjectType()
export class image_author {
	@Field()
	id!: number;
	@Field()
	username!: string;
	@Field()
	image_link!: string;
}

@ObjectType()
export class image_data extends Image {
	@Field()
	id!: string;
	@Field()
	caption!: string;
	@Field()
	image_url!: string;
	@Field(() => [Like], { nullable: true })
	like!: Like[];
	@Field(() => String)
	created_at!: Date;
}

@ObjectType()
export class image_error {
	@Field()
	message!: string;
}

@ObjectType()
export class image_upload_response {
	@Field(() => image_data, { nullable: true })
	image?: image_data;
	@Field(() => image_error, { nullable: true })
	error?: image_error;
}

@ObjectType()
export class images {
	@Field(() => [image_data])
	images!: image_data[];
	@Field(() => Boolean)
	hasMore!: boolean;
}

@ObjectType()
export class image_res {
	@Field(() => image_data, { nullable: true })
	image?: image_data;
	@Field(() => image_error, { nullable: true })
	error?: image_error;
}

export const CLOUDINARY_CONFIG = {
	CLOUD_NAME: process.env.CLOUD_NAME,
	API_KEY: process.env.API_KEY,
	API_SECRET: process.env.API_SECRET
};
