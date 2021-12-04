import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver
} from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";
import { validateRegister } from "../utils/validateRegister";

@InputType()
export class UserRegisterInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
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

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInput
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user;
    try {
      user = await User.create({
        email: options.email,
        username: options.username,
        password: hashedPassword
      }).save();
    } catch (err) {
      if (err.code === "23505") {
        // duplicate email error
        if (/Key \(email\)=\(.*\) already exists./.test(err.detail)) {
          return {
            errors: [
              {
                field: "email",
                message: "email already taken"
              }
            ]
          };
        }
        // duplicate username error
        if (/Key \(username\)=\(.*\) already exists./.test(err.detail)) {
          return {
            errors: [
              {
                field: "username",
                message: "usename already taken"
              }
            ]
          };
        }
      }
    }

    return { user };
  }
}
