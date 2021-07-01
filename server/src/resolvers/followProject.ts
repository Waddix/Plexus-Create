import { Project } from "../db/entities/Project";
import { Profile } from "../db/entities/Profile";
import { Arg, Int, Mutation, Resolver, Query } from "type-graphql";
import { getConnection } from "typeorm";


@Resolver()

export class FollowProjectResolver {
  @Mutation(() => Boolean)
  async followProject(
    @Arg('profileId', () => Int) profileId: number,
    @Arg('projectId', () => Int) projectId: number,
  ): Promise<Project | boolean> {
    await getConnection()
      .createQueryBuilder()
      .relation(Profile, "followedProjects")
      .of(profileId)
      .add(projectId)
    return true;
  }

  @Query(() => [Project], { nullable: true })
  async getFollowedProjects(
    @Arg('profileId', () => Int) profileId: number,
    // @Arg('projectId', () => Int) projectId: number,
  ): Promise<Project[]> {
    const projects = await getConnection()
      .createQueryBuilder()
      .relation(Profile, 'followedProjects')
      .of(profileId)
      .loadMany();
    return projects;
  }


}



