/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Unique, } from 'typeorm';
import { Base } from './Base';
@ObjectType()
@Unique(['name'])
@Entity()
export class Tag extends Base {
  @Field(() => String)
  @Column({ type: 'text' })
  name!: string;
}
