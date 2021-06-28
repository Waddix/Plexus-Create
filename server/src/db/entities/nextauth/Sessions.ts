// Sessions for Next Auth
import { Field, ObjectType, } from 'type-graphql';
import { Column, Unique, Index } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { NABase } from './NABase'

@ObjectType()
@Unique(['session_token', 'access_token'])
@Entity()
export class Sessions extends NABase {
  @Field(() => Number)
  @Column({})
  user_id!: number;

  @Field(() => Date)
  @Column('timestamptz')
  expires!: Date;

  @Index()
  @Column({})
  session_token!: string;

  @Index()
  @Column({})
  access_token!: string;
}