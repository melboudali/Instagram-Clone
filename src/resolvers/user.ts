import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entities/user";
import { MyContext } from "../types";
import argon2 from "argon2";
import { cookieName } from "../config/constants";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuthenticated";
import { register_inputs, response, responses, user_response } from "../models/user";

@Resolver(User)
export class UserResolver {
	@Query(() => user_response, { nullable: true })
	async me(@Ctx() { req }: MyContext) {
		if (!req.session!.user_id) {
			return null;
		}
		return await User.findOne(req.session.user_id);
	}

	@Mutation(() => response)
	async register(
		@Arg("registerInputs") registerInputs: register_inputs,
		@Ctx() { req }: MyContext
	): Promise<response> {
		const { email, fullName: fullname, password } = registerInputs;
		const username = registerInputs.userName.toLowerCase().split(" ").join(".");
		const hashedPassword = await argon2.hash(registerInputs.password);

		if (fullname.length <= 3 || username.length <= 3 || password.length <= 3) {
			return {
				error: { message: "Full name or Username or Password length should be greater than 5." }
			};
		}
		if (email.length <= 3 || !email.includes("@")) {
			return { error: { message: "Invalid email." } };
		}

		let user: user_response | null = null;
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
		req.session.user_id = user!.id;
		return {
			user: {
				id: user!.id,
				username: user!.username,
				fullname: user!.fullname,
				email: user!.email,
				phone_number: user!.phone_number,
				gender: user!.gender,
				recomended: user!.recomended,
				images_length: user!.images_length,
				image_link: user!.image_link,
				website: user!.website,
				bio: user!.bio,
				private: user!.private,
				disabled: user!.disabled
			}
		};
	}

	@Mutation(() => response)
	async login(
		@Arg("userNameOrEmail") userNameOrEmail: string,
		@Arg("password") password: string,
		@Ctx() { req }: MyContext
	): Promise<response> {
		const isEmail = userNameOrEmail.includes("@");
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
		return {
			user: {
				id: user.id,
				username: user.username,
				fullname: user.fullname,
				email: user.email,
				phone_number: user.phone_number,
				gender: user.gender,
				recomended: user.recomended,
				images_length: user.images_length,
				image_link: user.image_link,
				website: user.website,
				bio: user.bio,
				private: user.private,
				disabled: user.disabled
			}
		};
	}

	@Query(() => response)
	async getUser(@Arg("username") username: string): Promise<response> {
		const user = await User.createQueryBuilder("user")
			.loadRelationCountAndMap("user.images_length", "user.images", "image")
			.where("username = :username", { username })
			.getOne();

		if (!user) {
			return {
				error: {
					message: `User '${username}' not found!`
				}
			};
		}

		const {
			id,
			username: userName,
			fullname,
			image_link,
			website,
			bio,
			private: isPrivate,
			images_length,
			disabled
		} = user;

		return {
			user: {
				id,
				username: userName,
				fullname,
				image_link,
				website,
				bio,
				private: isPrivate,
				images_length,
				disabled
			}
		};
	}

	@Query(() => responses)
	@UseMiddleware(isAuth)
	async suggestedUsers(@Ctx() { req }: MyContext): Promise<responses> {
		const id = req.session.user_id;
		const users = await User.createQueryBuilder()
			.where("id != :id", { id })
			.orderBy("id", "DESC")
			.limit(4)
			.getMany();

		return {
			users
		};
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise(resolve =>
			req.session?.destroy(err => {
				res.clearCookie(cookieName);
				if (err) {
					resolve(false);
					return;
				} else {
					resolve(true);
				}
			})
		);
	}
}
