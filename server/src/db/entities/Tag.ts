/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  Entity, Property, PrimaryKey, Collection, ManyToMany,
} from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import Post from './Post';

@ObjectType()
@Entity()
export default class Tag {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: 'text' })
  name!: string;

  @Field(() => [Post])
  @ManyToMany(() => Post, (p: Post) => p.tags)
  posts = new Collection<Post>(this);

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
