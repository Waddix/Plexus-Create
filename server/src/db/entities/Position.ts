import { ObjectType, Field } from "type-graphql";
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { Project } from "./Project";
import { Tag } from "./Tag";

@ObjectType()
@Entity()
export class Position extends Base {
  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => String)
  @Column()
  type!: string;

  @Field(() => [Project])
  @ManyToOne(() => Project, project => project.title)
  project: Project[];

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (t: Tag) => t.name, {cascade: true, nullable: true})
  @JoinTable()
  tags: Tag[];
}