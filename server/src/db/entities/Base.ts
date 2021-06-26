import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@ObjectType({ isAbstract: true })
export abstract class Base extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({})
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // constructor(body = {}) {
  //   super();
  //   this.assign(body); for validation
  // }
}
