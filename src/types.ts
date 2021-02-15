import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";

export interface MyContext {
	req: Request & { session: Session & { user_id: number } };
	res: Response;
	redis: Redis;
	userLoader: ReturnType<typeof createUserLoader>;
}
