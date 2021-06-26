import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import { Profile } from "./Profile";
import { Column, Entity, ManyToOne } from "typeorm";

@ObjectType()
@Entity()
export class Project extends Base {
  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  description!: string

  @Field()
  @Column()
  ownerId!: number;

  @Field(() => Profile)
  @ManyToOne(() => Profile)
  owner!: Profile


}