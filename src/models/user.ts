import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class register_inputs {
	@Field()
	userName!: string;
	@Field()
	email!: string;
	@Field()
	password!: string;
	@Field()
	fullName!: string;
}

@ObjectType()
export class user_image_data {
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
export class user_response {
	@Field()
	id!: number;
	@Field()
	username!: string;
	@Field()
	fullname!: string;
	@Field()
	image_link!: string;
	@Field({ nullable: true })
	website!: string;
	@Field({ nullable: true })
	bio!: string;
	@Field()
	private!: boolean;
	@Field(() => [user_image_data])
	images!: user_image_data[];
}

@ObjectType()
export class error {
	@Field()
	message!: string;
}

@ObjectType()
export class response {
	@Field(() => error, { nullable: true })
	error?: error;
	@Field(() => user_response, { nullable: true })
	user?: user_response;
}

@ObjectType()
export class responses {
	@Field(() => [user_response])
	users!: user_response[];
}
