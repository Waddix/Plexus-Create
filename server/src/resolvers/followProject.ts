import { Project } from "../db/entities/Project";
import { Profile } from "../db/entities/Profile";
import { Arg, Int, Mutation, Resolver, Query } from "type-graphql";
import { getConnection } from "typeorm";
// import { Post } from "src/db/entities/Post";

@Resolver()
export class FollowProjectResolver {
  @Mutation(() => Boolean)
  async followProject(
    @Arg("profileId", () => Int) profileId: number,
    @Arg("projectId", () => Int) projectId: number
  ): Promise<Project | boolean> {
    await getConnection()
      .createQueryBuilder()
      .relation(Profile, "followedProjects")
      .of(profileId)
      .add(projectId);
    return true;
  }

  @Query(() => [Project], { nullable: true })
  async getFollowedProjects(
    @Arg("profileId", () => Int) profileId: number
    // @Arg('projectId', () => Int) projectId: number,
  ): Promise<Project[]> {
    const projects = await getConnection()
      .createQueryBuilder()
      .relation(Profile, "followedProjects")
      .of(profileId)
      .loadMany();
    return projects
  }

  //? trying to fetch posts associated with project.
  // @Query(() => [Project], { nullable: true })
  // async followedProjPosts(
  //   @Arg("profileId", () => Int) profileId: number
  //   // @Arg('projectId', () => Int) projectId: number,
  // ): Promise<Post[]> {
  //   const posts = await getConnection()
  //     .createQueryBuilder()
  //     .leftJoinAndSelect()

  //   // .loadMany()

  //   // return projects.
  // }

  // @Query(() => [Project], { nullable: true })
  // async getFollowedProjectsPosts(
  //   @Arg('profileId', () => Int) profileId: number,
  //   // @Arg('projectId', () => Int) projectId: number,
  // ): Promise<Project[]> {
  //   const posts = await getConnection()
  //     .createQueryBuilder()
  //     .relation(Profile, 'followedProjects')
  //     .of(profileId)
  //     .loadMany()
  //   return posts;
  // }
}
