import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@ObjectType({ isAbstract: true })
export abstract class Base extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz'})
  updatedAt: Date;
}
