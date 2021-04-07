import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entities/user";
import { MyContext } from "../types";
import argon2 from "argon2";
import { COOKIE_NAME } from "../config/constants";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuthenticated";
import { register_inputs, response, responses, user_response, passwordVerification } from "../models/user";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { CLOUDINARY_CONFIG } from "../models/images";
import { v2 as cloudinary } from "cloudinary";

@Resolver(User)
export class UserResolver {
	@Query(() => user_response, { nullable: true })
	async me(@Ctx() { req }: MyContext) {
		if (!req.session!.user_id) {
			return null;
		}
		return await User.findOne(req.session.user_id);
	}

	@Query(() => response)
	async getUser(
		@Arg("username") username: string,
		@Arg("currentUserId", () => Int, { nullable: true }) currentUserId: number | null
	): Promise<response> {
		const user = await User.createQueryBuilder("user")
			.loadRelationCountAndMap("user.images_length", "user.images", "image")
			.where("username = :username", { username })
			.getOne();

		if (!user || (user.disabled && (!currentUserId || currentUserId != user.id))) {
			return {
				error: {
					message: `Sorry, this page isn't available.`
				}
			};
		}

		const { id, username: userName, fullname, image_link, website, bio, private: isPrivate, images_length, disabled } = user;

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
		const users = await User.createQueryBuilder()
			.where("id != :id", { id: req.session.user_id })
			.andWhere("recomended")
			.orderBy("id", "DESC")
			.limit(4)
			.getMany();

		return {
			users
		};
	}

	@Mutation(() => response)
	async register(@Arg("registerInputs") registerInputs: register_inputs, @Ctx() { req }: MyContext): Promise<response> {
		const { email, fullName: fullname, password } = registerInputs;

		if (email.length <= 6 || !email.includes("@") || email.includes(" ")) {
			return { error: { message: "Invalid email." } };
		}

		if (fullname.length <= 6 || registerInputs.userName.length <= 6 || password.length <= 6) {
			return {
				error: { message: "Full Name, Username and Password length should be greater than 5." }
			};
		}

		if (/\W+/.test(registerInputs.userName)) {
			return {
				error: { message: "Invalid Username." }
			};
		}

		const hashedPassword = await argon2.hash(registerInputs.password);

		let user: user_response | null = null;
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(User)
				.values({
					username: registerInputs.userName.toLowerCase(),
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

		req.session.user_id = user!.id!;

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

		if (userNameOrEmail.length <= 6 || !isEmail || userNameOrEmail.includes(" ")) {
			return { error: { message: "Invalid Username or Email." } };
		}
		if (password.length <= 6) {
			return {
				error: { message: "Password length should be greater than 5." }
			};
		}

		const user = await User.findOne({
			where: isEmail ? { email: userNameOrEmail } : { username: userNameOrEmail }
		});

		if (!user) {
			return {
				error: {
					message: "The username you entered doesn't belong to an account. Please check your username and try again."
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

	@Mutation(() => response)
	@UseMiddleware(isAuth)
	async editUser(
		@Arg("file", () => GraphQLUpload, { nullable: true }) File: FileUpload | null,
		@Arg("name") name: string,
		@Arg("username") username: string,
		@Arg("image_link") image_link: string,
		@Arg("website", () => String, { nullable: true }) website: string | null,
		@Arg("bio", () => String, { nullable: true }) bio: string | null,
		@Arg("email") email: string,
		@Arg("phoneNumber", () => Int, {
			nullable: true
		})
		phoneNumber: number | null,
		@Arg("gender", () => String, { nullable: true }) gender: string | null,
		@Arg("similarAccountSuggestions") similarAccountSuggestions: boolean,
		@Ctx() { req }: MyContext
	): Promise<response> {
		if (email.length <= 6 || !email.includes("@") || email.includes(" ")) {
			return { error: { message: "Invalid email." } };
		}

		if (name.length <= 6 || username.length <= 6 || email.length <= 6) {
			return {
				error: { message: "FullName, Username and Email length should be greater than 5." }
			};
		}

		if (/\W+/.test(username)) {
			return {
				error: { message: "Invalid Username." }
			};
		}

		const id = req.session.user_id;

		let user = {
			id,
			fullname: name,
			username: username.toLowerCase(),
			email,
			image_link,
			website: website!,
			bio: bio!,
			gender: gender!,
			phone_number: phoneNumber!,
			recomended: similarAccountSuggestions
		};

		if (File) {
			cloudinary.config(CLOUDINARY_CONFIG);
			File.createReadStream().pipe(
				cloudinary.uploader.upload_stream({ folder: process.env.CLOUDINARY_FOLDER }, async (error, result) => {
					if (error) {
						return { error: { message: error.message } };
					}
					try {
						user = { ...user, image_link: result?.secure_url as string };
						await User.update({ id }, user);
					} catch (error) {
						if (error.code === "23505") {
							return { error: { message: "That username or email address is already in use." } };
						}
					}
					return {
						user
					};
				})
			);
		} else {
			try {
				await User.update({ id }, user);
			} catch (error) {
				if (error.code === "23505") {
					return { error: { message: "That username or email address is already in use." } };
				}
			}
		}
		return {
			user
		};
	}

	@Mutation(() => passwordVerification)
	@UseMiddleware(isAuth)
	async changePassword(@Arg("oldPassword") oldPassword: string, @Arg("newPassword") newPassword: string, @Ctx() { req, res }: MyContext) {
		const id = req.session.user_id;
		const user = await User.findOne({ select: ["id", "password"], where: { id } });
		const passwordVerification = user?.password && (await argon2.verify(user?.password!, oldPassword));
		if (passwordVerification) {
			const nPassword = await argon2.hash(newPassword);
			await User.update({ id }, { password: nPassword });
			return new Promise(resolve => {
				req.session?.destroy(err => {
					res.clearCookie(COOKIE_NAME);
					if (err) {
						resolve({ error: { message: "Wrong Password!" } });
					} else {
						resolve({ success: { message: "Password Changed!" } });
					}
				});
			});
		} else {
			return { error: { message: "Wrong Password!" } };
		}
	}

	@Mutation(() => passwordVerification)
	@UseMiddleware(isAuth)
	async editPrivacy(
		@Arg("privateAccount") privateAccount: boolean,
		@Arg("disableAccount") disableAccount: boolean,
		@Ctx() { req }: MyContext
	) {
		const id = req.session.user_id;
		try {
			await User.update({ id }, { private: privateAccount, disabled: disableAccount });
			return { success: { message: "Privacy and security settings updated." } };
		} catch (error) {
			return { error: { message: "couldn't update privacy and security settings" } };
		}
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise(resolve =>
			req.session?.destroy(err => {
				res.clearCookie(COOKIE_NAME);
				if (err) {
					resolve(false);
				} else {
					resolve(true);
				}
			})
		);
	}
}
