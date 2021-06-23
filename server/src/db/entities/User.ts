/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  Entity, Property, OneToMany, Collection, PrimaryKey
} from '@mikro-orm/core';
// import { Base } from './Base';
import { Field, ObjectType, Int } from 'type-graphql';
import { Project } from './Project';

@ObjectType()
@Entity()
export default class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'text', unique: true })
  username!: string;

  // @Field(() => User)
  // @ManyToMany(() => User, (user) => user.username)
  // users = new Collection<User>(this);

  // No Field type here means the password is only accessible on database not accessible in graphql
  @Property({ type: 'text' })
  password!: string;

  @Field(() => [Project])
  @OneToMany(() => Project, (p: Project) => p.owner) //  {cascade: [Cascade.ALL]}
  projects = new Collection<Project>(this)

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
