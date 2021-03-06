import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Project } from "../db/entities/Project";
@InputType()
class ProjectInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  image: string;
}
@Resolver()

export class ProjectResolver {

  @Query(() => [Project])
  projects(): Promise<Project[]> {
    return Project.find({ relations: ["owner", "tags"] });
  }

  @Query(() => Project, { nullable: true })
  project(@Arg("id", () => Int) id: number): Promise<Project | void> {
    return Project.findOne(id, { relations: ["owner", "tags"] });
  }

  @Query(() => [Project], { nullable: true })
    getProjectsByUser(@Arg("ownerId", () => Int) ownerId: number):
    Promise<Project[]> {
      return Project.find({where: { ownerId }})
    }


  @Mutation(() => Project)
  // @UseMiddleware(auth) only loggedIn users can create/manipulate projects
  async createProject(
    @Arg("input") input: ProjectInput,
    @Arg("ownerId", () => Int) ownerId: number,
    @Arg("tagId", () => Int) tagId: number
  ): Promise<Project> {
    const project = await Project.create({ ...input, ownerId }).save();
    await getConnection()
    .createQueryBuilder()
    .relation(Project, "tags")
    .of(project.id)
    .add(tagId);

    return project;
  }

  @Mutation(() => Project, { nullable: true })
  // @UseMiddleware(auth) only loggedIn users can create/manipulate projects
  async updateProject(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string,
    @Arg("ownerId", () => Int) ownerId: number
  ): Promise<Project | null> {
    const project = await getConnection()
      .createQueryBuilder()
      .update(Project)
      .set({ title, description })
      .where('id = :id and "ownerId" = :ownerId', {
        id,
        ownerId,
      })
      .returning("*")
      .execute();
    return project.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Project.delete(id);
    return true;
  }
}
