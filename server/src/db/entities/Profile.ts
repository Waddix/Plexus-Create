/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Base } from './Base';
import { Field, Int, ObjectType, } from 'type-graphql';
import { Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Base } from './Base';
import { Users } from './nextauth/Users';
import { Project } from './Project';

@ObjectType()
@Entity()
export class Profile extends Base {
  @Field(() => Int)
  @OneToOne(() => Users, user => user.id)
  @JoinColumn()
  user_id: Users;

  @Field(() => String)
  @Column({})
  name!: string;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @OneToOne(() => Users, user => user.email)
  @JoinColumn()
  email: Users;

  // No Field Decorator here means the password is only accessible on database not accessible in graphql
  @Column()
  password!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  website: string;

  @OneToMany(() => Project, (p: Project) => p.owner)
  projects: Project[]
}
