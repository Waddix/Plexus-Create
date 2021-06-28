// Accounts for Next Auth
import { Field, ObjectType, } from 'type-graphql';
import { Column, Unique, Index } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { NABase } from './NABase'

@ObjectType()
@Unique(['compound_id'])
@Entity()
export class Accounts extends NABase {
  @Field(() => String)
  @Index()
  @Column()
  compound_id!: string;

  @Field(() => Number)
  @Index()
  @Column({})
  user_id!: number;

  @Column({})
  provider_type!: string;

  @Field(() => String)
  @Index()
  @Column({})
  provider_id!: string;

  @Field(() => String)
  @Index()
  @Column({})
  provider_account_id!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  refresh_token: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  access_token: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  access_token_expires: Date;
}