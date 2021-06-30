import { Field, ObjectType } from "type-graphql";
import { JoinColumn, ManyToOne, Column } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

import { Project } from "./Project";
import { Profile } from "./Profile";
import { Base } from "./Base";

@ObjectType()
@Entity()

export class FollowProject extends Base {

  @Field()
  @Column()
  profileId!: number;

  @Field()
  @Column()
  projectId: number;

  @ManyToOne(() => Profile, profile => profile.followProject)
  @JoinColumn({ name: "profileId" })
  profile!: Promise<Profile>;

  @ManyToOne(() => Project, project => project.follower)
  @JoinColumn({ name: "projectId" })
  project!: Promise<Project>;


}

