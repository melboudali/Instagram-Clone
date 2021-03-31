import { Comment } from "../entities/comment";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class comment_author {
	@Field()
	id!: number;
	@Field()
	username!: string;
}

@ObjectType()
export class comment_res extends Comment {
	@Field()
	id!: number;
	@Field()
	text!: string;
	@Field()
	imageId!: string;
	@Field()
	created_at!: Date;
}

@ObjectType()
export class insert_comment {
	@Field()
	inserted!: boolean;
	@Field({ nullable: true })
	message?: string;
	@Field(() => comment_res)
	comment?: comment_res;
}
