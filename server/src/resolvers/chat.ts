import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { Chat } from "../entities/Chat";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

@Resolver()
export class ChatResolver {
  // read
  @Query(() => [Chat])
  async messages(): Promise<Chat[]> {
    let chats = await getConnection()
      .createQueryBuilder()
      .select([
        "c.id",
        "c.message",
        "c.createdAt",
        "c.updatedAt",
        "s.id",
        "s.username"
      ])
      .from(Chat, "c")
      .innerJoin("c.sender", "s")
      .orderBy("c.id", "DESC")
      .getMany();

    return chats.reverse();
  }

  @Query(() => Chat, { nullable: true })
  async message(@Arg("id") id: number): Promise<Chat | undefined> {
    return await Chat.findOne(id);
  }

  // create
  @Mutation(() => Chat)
  @UseMiddleware(isAuth)
  async createMessage(
    @Arg("message") message: string,
    @Ctx() { req }: MyContext
  ): Promise<Chat> {
    return await Chat.create({ message, senderId: req.session.userId }).save();
  }

  // update
  @Mutation(() => Chat, { nullable: true })
  async updateMessage(
    @Arg("id") id: number,
    @Arg("message") message: string
  ): Promise<Chat | null> {
    const chat = await Chat.findOne(id);
    if (!chat) {
      return null;
    }
    if (typeof message !== "undefined") {
      await Chat.update({ id }, { message });
    }

    return chat;
  }

  // delete
  @Mutation(() => Boolean)
  async deleteMessage(@Arg("id") id: number): Promise<boolean> {
    await Chat.delete(id);
    return true;
  }
}
