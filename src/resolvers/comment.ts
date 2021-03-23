import { Comment } from "../entities/comment";
import { isAuth } from "../middleware/isAuthenticated";
import { MyContext } from "../types";
import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware
} from "type-graphql";
import { comment_author } from "../models/comment";

@Resolver(Comment)
export class CommentResolver {
	// Queries
	@Query(() => [Comment])
	@UseMiddleware(isAuth)
	async getImageComments(@Arg("imageId") imageId: string) {
		const res = await Comment.find({ where: { imageId } });
		return res;
	}
	// Mutations
	@Mutation(() => String)
	@UseMiddleware(isAuth)
	async insertComment(
		@Arg("comment") comment: string,
		@Arg("imageId") imageId: string,
		@Ctx() { req }: MyContext
	): Promise<String> {
		try {
			await Comment.insert({ text: comment, imageId, userId: req.session.user_id });
		} catch (error) {
			return "Comment not inserted";
		}
		return "Comment inserted";
	}

	@FieldResolver(() => comment_author)
	user(@Root() comment: Comment, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(comment.userId);
	}
}
