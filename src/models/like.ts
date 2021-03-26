import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class like_image {
	@Field()
	liked!: boolean;
	@Field({ nullable: true })
	message?: string;
}
