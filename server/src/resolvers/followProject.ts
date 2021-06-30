// import { Profile } from "src/db/entities/Profile";
// import { Project } from "src/db/entities/Project";

import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { FollowProject } from "../db/entities/FollowProject";

@Resolver()

export class FollowProjectResolver {

  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async followProject(
    @Arg('projectId', () => Int) projectId: number,
    @Arg('profileId', () => Int) profileId: number,
  ) {
    await FollowProject.insert({ projectId, profileId })
    return true;
  }

}