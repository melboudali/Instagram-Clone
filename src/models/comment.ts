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
export class insert_comment {
	@Field()
	inserted!: boolean;
	@Field({ nullable: true })
	message?: string;
	@Field({ nullable: true })
	comment?: Comment;
}
