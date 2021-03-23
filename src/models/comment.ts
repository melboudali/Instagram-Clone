import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class comment_author {
	@Field()
	id!: number;
	@Field()
	username!: string;
	// @Field()
	// image_link!: string;
}
