import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";
import { validateRegister } from "../utils/validateRegister";
import { MyContext } from "../types";

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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne({ id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user!: User;
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
                message: "email already in use"
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
                message: "username already taken"
              }
            ]
          };
        }
      }
    }

    // store a cookie
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "user doesn't exist"
          }
        ]
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "wrong password"
          }
        ]
      };
    }

    // store a cookie
    req.session.userId = user.id;

    return { user };
  }
}
