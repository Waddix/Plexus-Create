/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Base } from './Base';
import { Field, Int, ObjectType } from "type-graphql";
import { Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Base } from "./Base";
import { Users } from "./nextauth/Users";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Profile extends Base {
  @Field(() => Int)
  @OneToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user_id: number;

  @Field(() => String)
  @Column({})
  name!: string;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @OneToOne(() => Users)
  @JoinColumn({ name: "email", referencedColumnName: "email" })
  email: string;

  // No Field Decorator here means the password is only accessible on database not accessible in graphql
  @Column({ nullable: true })
  password: string;

  @Field(() => String)
  @Column({
    type: "text",
    nullable: true,
  })
  image: string;

  @Field(() => String)
  @Column({
    nullable: true,
  })
  title: string;

  @Field(() => String)
  @Column({
    type: "text",
    nullable: true,
  })
  bio: string;

  @Field(() => String)
  @Column({
    type: "text",
    nullable: true,
  })
  website: string;

  // @OneToOne(() => Users)
  // @JoinColumn()
  // user: Users;

  @OneToMany(() => Project, (p: Project) => p.owner)
  projects: Project[];
}
