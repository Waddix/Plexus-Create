// Base for Next Auth. It doesn't follow the same schema as ours.
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({ isAbstract: true })

export abstract class NABase extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({})
  id!: number;

  @Field(() => Date)
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at!: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => "CURRENT_TIMESTAMP"
  })
  updated_at!: Date;
}
