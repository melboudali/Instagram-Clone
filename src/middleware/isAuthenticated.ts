import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!context.req.session.user_id) {
		return {
			error: {
				message: "Unauthorized"
			}
		};
	}
	return await next();
};
