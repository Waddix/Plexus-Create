// Users for Next Auth
import { Field, ObjectType, } from 'type-graphql';
import { Column, Unique, Index } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { NABase } from './NABase'

@ObjectType()
@Unique(['email'])
@Entity()
export class Users extends NABase {
  @Field(() => String)
  @Column({
    nullable: true,
  })
  name: string;

  @Field(() => Number)
  @Index()
  @Column({
    nullable: true,
  })
  email: string;

  @Field(() => Date)
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  email_verified: string;

  @Field(() => String)
  @Column({
    type:'text',
    nullable: true,
  })
  image: string;
}