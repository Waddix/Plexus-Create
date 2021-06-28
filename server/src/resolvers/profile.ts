// import { Users } from "../db/entities/nextauth/Users";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  InputType,
  Int,
} from "type-graphql";
// import { getConnection } from 'typeorm';
import { Profile } from "../db/entities/Profile";

@InputType()
class ProfileInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  website: string;
}

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile], { nullable: true })
  getAllProfiles(): Promise<Profile[]> {
    return Profile.find({ relations: ["user_id", "email"] });
  }

  @Query(() => Profile)
  findProfileID(
    @Arg("id", () => Int) id: number
  ): Promise<Profile | undefined> {
    return Profile.findOne(id, { relations: ["user_id", "email"] });
  }

  @Query(() => Profile)
  findProfileUserId(
    @Arg("user_id", () => Int) user_id: number
  ): Promise<Profile | undefined> {
    return Profile.findOne({
      where: { user_id: user_id },
      relations: ["user_id", "email"],
    });
  }
  @Query(() => Profile)
  findProfileUsername(
    @Arg("username", () => String) username: string
  ): Promise<Profile | undefined> {
    return Profile.findOne({
      where: { username: username },
      relations: ["user_id", "email"],
    });
  }

  @Mutation(() => Profile)
  async createProfile(@Arg("input") input: ProfileInput): Promise<Profile> {
    return Profile.create({ ...input }).save();
  }
}
