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
import { comment_author, comment_res, insert_comment } from "../models/comment";
import { getConnection } from "typeorm";

@Resolver(Comment)
export class CommentResolver {
	// Queries
	@Query(() => [comment_res])
	@UseMiddleware(isAuth)
	async getImageComments(@Arg("imageId") imageId: string) {
		const res = await Comment.find({ where: { imageId } });
		return res;
	}
	// Mutations
	@Mutation(() => insert_comment)
	@UseMiddleware(isAuth)
	async insertComment(
		@Arg("comment") comment: string,
		@Arg("imageId") imageId: string,
		@Ctx() { req }: MyContext
	): Promise<insert_comment> {
		let insertedComment;
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Comment)
				.values({
					text: comment,
					imageId,
					userId: req.session.user_id
				})
				.returning("*")
				.execute();
			insertedComment = result.raw[0];
		} catch (_) {
			return { inserted: false, message: "An error occurred. Try again later" };
		}
		return { inserted: true, comment: insertedComment };
	}

	@FieldResolver(() => comment_author)
	user(@Root() comment: Comment, @Ctx() { userLoader }: MyContext) {
		return userLoader.load(comment.userId);
	}
}
