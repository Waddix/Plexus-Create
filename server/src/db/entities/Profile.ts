// import { Base } from './Base';
import { Field, ObjectType, } from 'type-graphql';
import { Column, JoinColumn, OneToMany, OneToOne, } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Base } from './Base';
import { Users } from './nextauth/Users';
import { Project } from './Project';

@ObjectType()
@Entity()
export class Profile extends Base {
  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({unique: true})
  email!: string;
  // No Field Decorator here means the password is only accessible on database not accessible in graphql
  @Column()
  password!: string;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @OneToMany(() => Project, (p: Project) => p.owner)
  projects: Project[]
}
