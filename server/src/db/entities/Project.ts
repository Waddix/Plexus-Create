import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import { Profile } from "./Profile";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Tag } from "./Tag";

@ObjectType()
@Entity()
export class Project extends Base {
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  ownerId!: number;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (p) => p.projects)
  owner!: Profile;

  @Field(() => Tag)
  @ManyToMany(() => Tag, (t) => t.name)
  @JoinTable()
  tags: Tag[];

}