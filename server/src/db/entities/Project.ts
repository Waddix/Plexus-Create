import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import User from "./User";

@ObjectType()
@Entity()
export class Project extends Base<Project>{
  @Field()
  @Property()
  title!: string

  @Field()
  @Property()
  description!: string

  @Field(() => User)
  @ManyToOne(() => User)
  owner!: User


}