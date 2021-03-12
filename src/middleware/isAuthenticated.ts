import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	const userId = context.req.session.user_id;
	if (!userId) {
		return {
			error: {
				message: "Unauthorized"
			}
		};
	}
	return await next();
};
