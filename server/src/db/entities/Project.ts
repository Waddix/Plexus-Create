import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import {User} from "./User";
import { Column, Entity, ManyToOne  } from "typeorm";

@ObjectType()
@Entity()
export class Project extends Base{
  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  description!: string

  @Field()
  @Column()
  ownerId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  owner!: User


}