import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';
import { createUserLoader } from './utils/createUserLoader';

export type MyContext = {
  req: Request & { session: Session & { userId: number } }; // nested types
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>; //if we dont know the type we can use TS ReturnType to get the type
};
