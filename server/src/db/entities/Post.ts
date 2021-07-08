import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { Profile } from "./Profile";
import { Project } from "./Project";
import { Tag } from "./Tag";

@ObjectType()
@Entity()
export class Post extends Base {
  @Field(() => String)
  @Column()
  text!: string;

  @Field()
  @Column()
  ownerId!: number;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile: Profile) => profile.posts, {cascade:true})
  owner!: Profile;

  @Field(() => Project)
  @ManyToOne(() => Project, (project: Project) => project.posts, {cascade:true})
  project!: Project;



  // @Field(() => String)
  // @Column()
  // type!: string;


  @Field(() => [Tag])
  @ManyToMany(() => Tag, (t: Tag) => t.name, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
