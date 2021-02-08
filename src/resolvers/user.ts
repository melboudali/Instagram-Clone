import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware
} from "type-graphql";
import { User } from "../entities/user";
import { MyContext } from "../types";
import argon2 from "argon2";
import { cookieName } from "../config/constants";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuthenticated";

@InputType()
class registerInputs {
	@Field()
	userName: string;
	@Field()
	email: string;
	@Field()
	password: string;
	@Field()
	fullName: string;
}

@ObjectType()
class FieldError {
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => FieldError, { nullable: true })
	error?: FieldError;
	@Field(() => User, { nullable: true })
	user?: User;
}

@ObjectType()
class UsersResponse {
	@Field(() => [User], { nullable: true })
	users?: User[];
}

@Resolver(User)
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: MyContext) {
		if (!req.session!.user_id) {
			return null;
		}
		return await User.findOne(req.session.user_id);
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg("registerInputs") registerInputs: registerInputs,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const fullname = registerInputs.fullName;
		const username = registerInputs.userName.toLowerCase().split(" ").join(".");
		const email = registerInputs.email;
		const password = registerInputs.password;
		const hashedPassword = await argon2.hash(registerInputs.password);

		if (fullname.length <= 3 || username.length <= 3 || password.length <= 3) {
			return {
				error: { message: "Full name or Username or Password length should be greater than 5." }
			};
		}
		if (email.length <= 3 || !email.includes("@")) {
			return { error: { message: "Invalid email." } };
		}

		let user;
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(User)
				.values({
					username,
					fullname,
					email,
					password: hashedPassword
				})
				.returning("*")
				.execute();
			user = result.raw[0];
		} catch (error) {
			if (error.code === "23505") {
				return { error: { message: "That username or email address is already in use." } };
			}
		}
		req.session!.user_id = user.id;
		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg("userNameOrEmail") userNameOrEmail: string,
		@Arg("password") password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const isEmail: boolean = !!userNameOrEmail.includes("@");
		const user = await User.findOne({
			where: isEmail ? { email: userNameOrEmail } : { username: userNameOrEmail }
		});

		if (!user) {
			return {
				error: {
					message:
						"The username you entered doesn't belong to an account. Please check your username and try again."
				}
			};
		}
		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			return {
				error: {
					message: "Sorry, your password was incorrect. Please double-check your password."
				}
			};
		}
		req.session.user_id = user.id;
		return { user };
	}

	@Query(() => UserResponse)
	async getUser(@Arg("username") username: string): Promise<UserResponse> {
		const user = await User.createQueryBuilder("user")
			.leftJoinAndSelect("user.images", "image")
			.where("username = :username", { username })
			.orderBy("image.created_at", "DESC")
			.getOne();

		if (user) {
			return { user };
		} else {
			return {
				error: {
					message: `User '${username}' not found!`
				}
			};
		}
	}

	@Query(() => UsersResponse)
	@UseMiddleware(isAuth)
	async suggestedUsers(@Ctx() { req }: MyContext): Promise<UsersResponse> {
		const id = req.session.user_id;
		const users = await User.createQueryBuilder()
			.where("id != :id", { id })
			.orderBy("id", "DESC")
			.limit(4)
			.getMany();
		return { users };
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise(resolve =>
			req.session?.destroy(err => {
				res.clearCookie(cookieName);
				if (err) {
					console.log(err.message);
					resolve(false);
					return;
				} else {
					resolve(true);
				}
			})
		);
	}
}
