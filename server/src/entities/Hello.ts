import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class HelloOkay {
  @Field()
  hello: String;
}
