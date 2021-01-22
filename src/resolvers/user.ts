import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from '../entities/user';
import { MyContext } from 'src/types';
import argon2 from 'argon2';
import { cookieName } from '../config/constants';
import { getConnection } from 'typeorm';

@InputType()
class registerInputs {
  @Field()
  userName: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  fullName: string;
}

@ObjectType()
class FieldError {
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
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
    @Arg('registerInputs') registerInputs: registerInputs,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (registerInputs.fullName.length <= 2) {
      return {
        error: { message: 'Full name length should be greater than 2' }
      };
    }
    if (registerInputs.userName.length <= 2) {
      return {
        error: { message: 'Username length should be greater than 2' }
      };
    }
    if (registerInputs.email.length <= 2 || !registerInputs.email.includes('@')) {
      return { error: { message: 'Invalid email' } };
    }
    if (registerInputs.password.length <= 2) {
      return {
        error: { message: 'password length should be greater than 2' }
      };
    }
    const hashedPassword = await argon2.hash(registerInputs.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          userName: registerInputs.userName,
          fullName: registerInputs.fullName,
          email: registerInputs.email,
          password: hashedPassword
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (error) {
      if (error.code === '23505') {
        return { error: { message: 'Username already exist' } };
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
  ): Promise<UserResponse> {
    const isEmail: boolean = !!userNameOrEmail.includes('@');
    const user = await User.findOne({
      where: isEmail ? { email: userNameOrEmail } : { userName: userNameOrEmail }
    });

    if (!user) {
      return {
        error: {
          message:
            "The username you entered doesn't belong to an account. Please check your username and try again."
        }
      };
    }
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return {
        error: {
          message: 'Sorry, your password was incorrect. Please double-check your password.'
        }
      };
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
