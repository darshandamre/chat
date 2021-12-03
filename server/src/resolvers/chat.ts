import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Chat } from "../entities/Chat";

@Resolver()
export class ChatResolver {
  // read
  @Query(() => [Chat])
  async messages(): Promise<Chat[]> {
    return await Chat.find();
  }

  @Query(() => Chat, { nullable: true })
  async message(@Arg("id") id: number): Promise<Chat | undefined> {
    return await Chat.findOne(id);
  }

  // create
  @Mutation(() => Chat)
  async createMessage(@Arg("message") message: string): Promise<Chat> {
    return await Chat.create({ message }).save();
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
