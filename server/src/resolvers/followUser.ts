import { Profile } from '../db/entities/Profile'

import {
  Resolver, Query, Arg, Mutation, Int
} from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver()

export class FollowUserResolver {

  @Query(() => Profile, { nullable: true })
  user(
    @Arg('id', () => Int) id: number,
  ): Promise<Profile | undefined> {
    return Profile.findOne(id);
  }
  @Query(() => [Profile], {nullable: true})
  async getFollowedUsers(
    @Arg('profileId', () => Int) profileId: number
  ): Promise<Profile[]> {
    const following = await getConnection()
    .createQueryBuilder()
    .relation(Profile, "followers")
    .of(profileId)
    .loadMany();
    return following;
  }

  @Mutation(() => Boolean)
  async followUser(
    @Arg('profileId_1', () => Int) profileId_1: number,
    @Arg('profileId_2', () => Int) profileId_2: number,
  ): Promise<Profile | boolean> {
      await getConnection()
      .createQueryBuilder()
      .relation(Profile, "following")
      .of(profileId_1)
      .add(profileId_2);
      return true;
  }
}