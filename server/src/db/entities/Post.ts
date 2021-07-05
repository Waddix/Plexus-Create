import { Field, ObjectType } from 'type-graphql';
import {  Column, Entity, JoinTable, ManyToMany,  } from 'typeorm';
import { Base } from './Base';
import {Tag} from './Tag';

@ObjectType()
@Entity()
export class Post extends Base {
  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => String)
  @Column()
  type!: string;

 
  @Field(() => [Tag])
  @ManyToMany(() => Tag, (t: Tag) => t.name, {cascade: true})
  @JoinTable()
  tags: Tag[];
}