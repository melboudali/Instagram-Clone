import DataLoader from 'dataloader';
import { User } from '../entities/user';

export const createUserLoader = () =>
  new DataLoader<number, User>(async userIds => {
    const users = User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    (await users).forEach(u => {
      userIdToUser[u.id] = u;
    });
    return userIds.map(uid => userIdToUser[uid]);
  });
