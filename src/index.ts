import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { cookieName, serverMessage, isProd, serverPort } from "./config/constants";
import { UserResolver } from "./resolvers/user";
import { ImageResolver } from "./resolvers/image";
import { createUserLoader } from "./utils/createUserLoader";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { User } from "./entities/user";
import { Image } from "./entities/image";
import { Like } from "./entities/like";
import { Comment } from "./entities/comment";
import { Follower } from "./entities/follower";
import { graphqlUploadExpress } from "graphql-upload";
// import path from "path";

const main = async () => {
	const app = express();

	await createConnection({
		type: "postgres",
		url: process.env.DATABASE_URL,
		entities: [User, Image, Like, Comment, Follower],
		synchronize: !isProd,
		logging: true
	}).catch(error => console.log(error));

	const RedisStore = connectRedis(session);
	const redis = new Redis(process.env.REDIS_URL);

	app.set("trust proxy", 1);
	app.use(cors({ origin: "http://localhost:3000", credentials: true }));
	app.use(
		session({
			name: cookieName,
			store: new RedisStore({ client: redis, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
				httpOnly: true,
				sameSite: "lax",
				secure: isProd,
				domain: isProd ? process.env.SESSION_DOMAIN : undefined
			},
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET!,
			resave: false
		})
	);

	const apolloServer = new ApolloServer({
		uploads: false,
		schema: await buildSchema({ resolvers: [UserResolver, ImageResolver], validate: false }),
		context: ({ req, res }) => ({
			req,
			res,
			redis,
			userLoader: createUserLoader()
		})
	});

	app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

	apolloServer.applyMiddleware({ app, cors: false });

	app.use(express.static("public"));

	app.use((err: Error, _: Request, res: Response, _2: NextFunction) => {
		res.status(500).json({ message: err.message });
	});

	// if (process.env.NODE_ENV === "production") {
	// 	app.use(express.static(path.join(__dirname, "client/build")));
	// 	app.get("*", (_, res) => {
	// 		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	// 	});
	// }

	app.listen(serverPort, () => console.log(serverMessage));
};

main().catch(err => console.log(err));
