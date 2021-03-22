import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { Connection, createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, IS_PROD } from "./config/constants";
import { UserResolver } from "./resolvers/user";
import { ImageResolver } from "./resolvers/image";
import { CommentResolver } from "./resolvers/comment";
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
import path from "path";

const PORT = process.env.PORT || 5000;

const main = async () => {
	const app = express();

	const connection: Connection = await createConnection({
		type: "postgres",
		url: process.env.DATABASE_URL,
		synchronize: !IS_PROD,
		logging: !IS_PROD,
		ssl: IS_PROD ? { rejectUnauthorized: false } : false,
		entities: [User, Image, Like, Comment, Follower],
		migrations: [path.join(__dirname, "migrations/*.js")]
	});

	IS_PROD && (await connection.runMigrations());

	const RedisStore = connectRedis(session);
	const redis = new Redis(process.env.REDIS_URL);

	app.set("trust proxy", 1);
	app.use(cors({ origin: process.env.CORS_DOMAIN!, credentials: true }));
	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({ client: redis, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 10,
				httpOnly: true,
				sameSite: "lax",
				secure: false //default should be true (HTTPS only) but im using custom domain without https
				// domain: isProd ? process.env.SESSION_DOMAIN : undefined //keep this line commented if the app is deployed on heroku
			},
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET!,
			resave: false
		})
	);

	const apolloServer = new ApolloServer({
		uploads: false,
		schema: await buildSchema({
			resolvers: [UserResolver, ImageResolver, CommentResolver],
			validate: false
		}),
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

	if (IS_PROD) {
		app.use(express.static(path.join(__dirname, "../client/build")));
		app.get("*", (_, res) => {
			res.sendFile(path.join(__dirname, "../client/build/index.html"));
		});
	}

	app.listen(PORT, () =>
		console.log(
			`⚡️[server] => Server is running: \n - Home: http://localhost:3000 \n - Graphql: http://localhost:${PORT}/graphql`
		)
	);
};

main().catch(err => console.error(err));
