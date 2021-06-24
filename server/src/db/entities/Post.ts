/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Field, ObjectType } from 'type-graphql';
import {  Column, Entity, OneToMany,  } from 'typeorm';
import { Base } from './Base';
// import {Tag} from './Tag';

@ObjectType()
@Entity()
export class Post extends Base {
  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => String)
  @Column()
  type!: string;

  // @OneToMany(() => Tag, (tag) => tag.name)
  // tags: Tag[];
}
