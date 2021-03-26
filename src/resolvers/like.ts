import { Like } from "src/entities/like";
import { isAuth } from "src/middleware/isAuthenticated";
import { like_image } from "src/models/like";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

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
}
