import { HelloOkay } from "../entities/Hello";
import {
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription
} from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(@PubSub("OKAY") publish: Publisher<HelloOkay>) {
    await publish({ hello: "okay" });
    return "bye";
  }

  @Subscription(() => HelloOkay, {
    topics: "OKAY"
  })
  subsHello(@Root() okayPayload: HelloOkay): HelloOkay {
    return { ...okayPayload };
  }
}
