import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { Profile } from "../db/entities/Profile";
import { getConnection } from "typeorm";

@InputType()
class ProfileInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  // @Field(() => Settings)
  // settings: Settings;

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

@InputType()
class UpdateProfileInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  bio: string;

  @Field(() => String)
  website: string;
}

// @InputType()
// class LinkSettingInput {
//   @Field(() => Int)
//   id!: number;

//   @Field(() => Settings)
//   settings!: Settings;
// }

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile], { nullable: true })
  getAllProfiles(): Promise<Profile[]> {
    return Profile.find({
      relations: ["user_id", "email"],
    });
  }

  @Query(() => Profile)
  profileLookup(
    @Arg("id", () => Int) id: number
  ): Promise<Profile | undefined> {
    return Profile.findOne(id, {
      relations: ["user_id", "email"],
    });
  }

  @Query(() => Profile)
  findProfileID(
    @Arg("id", () => Int) id: number
  ): Promise<Profile | undefined> {
    return Profile.findOne(id, {
      relations: ["user_id", "email"],
    });
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
    return await Profile.create({ ...input }).save();
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Arg("input") input: UpdateProfileInput
  ): Promise<Profile | undefined> {
    const profile = await Profile.findOne({
      where: {
        id: input.id,
      },
    });

    if (profile) {
      profile.name = input.name;
      profile.username = input.username;
      profile.title = input.title;
      profile.bio = input.bio;
      profile.image = input.image;
      profile.website = input.website;
    }

    return await profile?.save();
  }

  @Query(() => String, { nullable: true })
  async getUserEmail(
    @Arg("profileId", () => Int) profileId: number
  ): Promise<string | null> {
    const profile = await getConnection()
      .createQueryBuilder()
      .relation(Profile, "email")
      .of(profileId)
      .loadOne();
    return profile;
  }
}
