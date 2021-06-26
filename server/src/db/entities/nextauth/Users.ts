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

  @Field(() => String)
  @Index()
  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  email_verified: string;

  @Column({
    type:'text',
    nullable: true,
  })
  image: string;
}