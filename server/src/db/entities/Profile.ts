// import { Base } from './Base';
import { Field, ObjectType, } from 'type-graphql';
import { Column, OneToMany, } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Base } from './Base';
import { Project } from './Project';

@ObjectType()
@Entity()
export class Profile extends Base {
  @Field(() => Number)
  @Column({ unique: true })
  user_id: number;

  @Field(() => String)
  @Column({})
  name!: string;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  // No Field Decorator here means the password is only accessible on database not accessible in graphql
  @Column()
  password!: string;

  @Column({
    type:'text',
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    type:'text',
    nullable: true,
  })
  bio: string;

  @Column({
    type:'text',
    nullable: true,
  })
  website: string;

  @OneToMany(() => Project, (p: Project) => p.owner)
  projects: Project[]
}
