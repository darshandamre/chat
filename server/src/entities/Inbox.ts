import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Inbox extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  lastMessage: string;

  @Field()
  @Column({ default: 0 })
  unseenNum: number;

  @Field()
  @Column()
  ownerId: number;

  @ManyToOne(() => User, user => user.inboxes)
  owner: User;

  @Field()
  @Column()
  senderId: number;

  @ManyToOne(() => User)
  sender: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
