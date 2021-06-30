import { Base } from "./Base"
import { Field, ObjectType } from "type-graphql";
import { Profile } from "./Profile";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { FollowProject } from "./FollowProject";
// import { Follow } from "./Follow";

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
  @ManyToOne(() => Profile, (p) => p.projects)
  owner!: Profile

  // //* Allow users to follow the project by establishing jointable with Profile via Follow entity
  @OneToMany(() => FollowProject, (followProject: any) => followProject.project)
  follower: Promise<FollowProject[]>;



  // @ManyToMany(() => Profile)
  // @JoinTable()
  // followers: Profile[];
}