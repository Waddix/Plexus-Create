import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import { Profile } from "./Profile";
import { Column, Entity, ManyToOne, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Tag } from "./Tag";
import { Position } from "./Position";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Project extends Base {
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => String)
  @Column()
  image: string;

  @Field()
  @Column()
  ownerId!: number;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (p: Profile) => p.projects, {cascade: true})
  owner!: Profile;

  @Field(() => [Post], {nullable: true})
  @OneToMany(() => Post, (post: Post) => post.project)
  posts: Promise<Post[]>;

  @Field(() => [Tag], {nullable: true})
  @ManyToMany(() => Tag, (t: Tag) => t.name, {cascade: true, nullable: true})
  @JoinTable()
  tags: Tag[];

  @Field(() => [Position], {nullable: true})
  @OneToMany(() => Position, (p: Position) => p.project, {nullable:true})
  position: Position[];

}