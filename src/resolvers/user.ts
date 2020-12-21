import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from '../entities/user';
import { MyContext } from 'src/types';
import argon2 from 'argon2';
import { cookieName } from '../config/constants';
import { getConnection } from 'typeorm';

@InputType()
class userInputs {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session!.userId) {
      return null;
    }
    return await User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('userInputs') userInputs: userInputs,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (userInputs.username.length <= 2) {
      return { errors: [{ field: 'username', message: 'Length should be greater than 2' }] };
    }
    if (userInputs.email.length <= 2 || !userInputs.email.includes('@')) {
      return { errors: [{ field: 'email', message: 'Invalid email' }] };
    }
    if (userInputs.password.length <= 2) {
      return { errors: [{ field: 'password', message: 'Length should be greater than 2' }] };
    }
    const hashedPassword = await argon2.hash(userInputs.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: userInputs.username,
          email: userInputs.email,
          password: hashedPassword
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (error) {
      if (error.code === '23505') {
        return { errors: [{ field: 'username', message: 'username already exist' }] };
      }
    }
    req.session!.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('userNameOrEmail') userNameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ) {
    const isEmail: boolean = userNameOrEmail.includes('@') ? true : false;
    const user = await User.findOne({
      where: isEmail ? { email: userNameOrEmail } : { username: userNameOrEmail }
    });

    if (!user) {
      return {
        errors: [{ field: 'userNameOrEmail', message: "username or email doesn't exist!" }]
      };
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return { errors: [{ field: 'password', message: "password doesn't match!" }] };
    }
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise(resolve =>
      req.session?.destroy(err => {
        res.clearCookie(cookieName);
        if (err) {
          console.log(err.message);
          resolve(false);
          return;
        } else {
          resolve(true);
        }
      })
    );
  }
}
