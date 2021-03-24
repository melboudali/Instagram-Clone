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

@ObjectType()
export class insert_comment {
	@Field()
	inserted!: boolean;
	@Field({ nullable: true })
	message?: string;
}
