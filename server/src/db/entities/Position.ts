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
  title!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => String)
  @Column()
  type!: string;

  @Field()
  @Column()
  projectId!: number;

  @Field(() => Project, {nullable: true})
  @ManyToOne(() => Project, (project: Project) => project.position, {cascade: true, nullable: true, eager: true})
  project: Promise<Project[]>;

  @Field(() => [Tag], {nullable: true})
  @ManyToMany(() => Tag, (t: Tag) => t.name, {cascade: true, nullable: true})
  @JoinTable()
  tags: Tag[];
}