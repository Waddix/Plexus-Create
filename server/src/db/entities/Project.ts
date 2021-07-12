import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import { Profile } from "./Profile";
import { Column, Entity, ManyToOne, JoinTable, ManyToMany, OneToMany } from "typeorm";
// import { FollowProject } from "./FollowProject";
// import { Follow } from "./Follow";
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

  @Field(() => String, {nullable: true})
  @Column()
  image: string;

  @Field()
  @Column()
  ownerId!: number;

  // Add Promise back to Profile
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