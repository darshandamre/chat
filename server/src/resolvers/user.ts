import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";

@InputType()
export class UserRegisterInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg("options") options: UserRegisterInput): Promise<User> {
    const hashedPassword = await argon2.hash(options.password);

    return User.create({
      email: options.email,
      username: options.username,
      password: hashedPassword
    }).save();
  }
}
