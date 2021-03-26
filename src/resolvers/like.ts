import { Like } from "../entities/like";
import { isAuth } from "../middleware/isAuthenticated";
import { like_image } from "../models/like";
import { MyContext } from "../types";
import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { image_author } from "../models/images";

@Resolver(Like)
export class LikeResolver {
	// Mutations
	@Mutation(() => like_image)
	@UseMiddleware(isAuth)
	async likeImage(@Arg("imageId") imageId: string, @Ctx() { req }: MyContext): Promise<like_image> {
		try {
			await Like.insert({ userId: req.session.user_id, imageId });
		} catch (error) {
			return { liked: false, message: error.message };
		}
		return { liked: true };
	}

	@FieldResolver(() => image_author)
	user(@Root() like: Like, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(like.userId);
	}
}
