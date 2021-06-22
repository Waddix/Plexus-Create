/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  Entity, Property, PrimaryKey, Collection, ManyToMany,
} from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import Tag from './Tag';

@ObjectType()
@Entity()
export default class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'text' })
  text!: string;

  @Field(() => String)
  @Property({ type: 'text' })
  type!: string;

  @Field(() => [Tag])
  @ManyToMany(() => Tag)
  tags = new Collection<Tag>(this);

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
