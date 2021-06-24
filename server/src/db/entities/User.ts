/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

// import { Base } from './Base';
import { Field, ObjectType, } from 'type-graphql';
import { Column, OneToMany, } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Base } from './Base';
import { Project } from './Project';

@ObjectType()
@Entity()
export class User extends Base {
  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({unique: true})
  email!: string;
  // No Field Decorator here means the password is only accessible on database not accessible in graphql
  @Column()
  password!: string;

  @OneToMany(() => Project, (p: Project) => p.owner) 
  projects: Project[]
}
