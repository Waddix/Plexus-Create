// import { Profile } from "src/db/entities/Profile";
// import { Project } from "src/db/entities/Project";

import { Project } from "../db/entities/Project";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { FollowProject } from "../db/entities/FollowProject";
// import { FollowUserResolver } from "./followUser";

@Resolver()

export class FollowProjectResolver {

  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async followProject(
    @Arg('profileId', () => Int) profileId: number,
    @Arg('projectId', () => Int) projectId: number,
  ) {
    await FollowProject.insert({ projectId, profileId })
    return true;
  }


  @Query(() => FollowProject, { nullable: true})
  getFollowedProjects(
    @Arg("id", () => Int) id: number): Promise<Project[]> {
      return Project.find({ relations: "follower"});
    }
  )
  // @Query(() => [Project], {nullable: true})
  // async getFollowedProjects(
  //   @Arg('profileId', () => Int) profileId: number,
  //   // @Arg('projectId', () => Int) projectId: number,
  // ): Promise<Project[]> {
  //   const projects = await getConnection()
  //   .createQueryBuilder()
  //   .relation(Project, 'follower')
  //   .of(profileId)
  //   .loadMany();
  //   return projects;
  }

}