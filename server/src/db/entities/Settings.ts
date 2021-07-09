import { Field, Int, ObjectType } from "type-graphql";
import { Column, OneToOne, JoinColumn, Entity } from "typeorm";

import { Base } from "./Base";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class Settings extends Base {
  @Field(() => Int)
  @OneToOne(() => Profile, (profile) => profile.id)
  @JoinColumn({ name: "profile_id", referencedColumnName: "id" })
  profile_id: number;

  @Field(() => Boolean)
  @Column({})
  dyslexic_font!: boolean;

  @Field(() => Boolean)
  @Column({})
  darkMode!: boolean;

  @Field(() => String)
  @Column({})
  colorScheme!: string;
}
