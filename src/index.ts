import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { cookieName, __listenMessage__, __prod__ } from './config/constants';
import { UserResolver } from './resolvers/user';
import { createUserLoader } from './utils/createUserLoader';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { User } from './entities/user';

const main = async () => {
  const app = express();

  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 3306,
    username: 'postgres',
    password: 'postgres',
    database: 'instagram',
    entities: [User],
    synchronize: !__prod__,
    logging: false
  }).catch(error => console.log(error));

  const RedisStore = connectRedis(session);
  const redis = new Redis('127.0.0.1:6379');

  app.set('trust proxy', 1);
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(
    session({
      name: cookieName,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
        domain: __prod__ ? '.domain.com' : undefined
      },
      saveUninitialized: false,
      secret: 'fzefzcefevcczgjnkukjgscercqzgsevhevcg',
      resave: false
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver], validate: false }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader()
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.use((err: Error, _: Request, res: Response, _2: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  app.listen(parseInt('4000'), () => console.log(__listenMessage__(parseInt('4000'))));
};

main().catch(err => console.log(err));
