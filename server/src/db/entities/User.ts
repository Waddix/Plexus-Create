/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  Entity, Property, PrimaryKey,
} from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export default class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  // @Field(() => User)
  // @ManyToMany(() => User, (user) => user.username)
  // users = new Collection<User>(this);

  // No Field type here means the password is only accessible on database not accessible in graphql
  @Property({ type: 'text' })
  password!: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
