import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import {User} from "./User";
import { Column } from "typeorm";

@ObjectType()
@Entity()
export class Project extends Base{
  @Field()
  @Property()
  title!: string

  @Field()
  @Property()
  description!: string

  @Field()
  @Column()
  ownerId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  owner!: User


}