import {
  Resolver, Query, Arg, Mutation, Field, InputType, Int,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import {Project} from '../db/entities/Project';
@InputType()
class ProjectInput{
  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

}
@Resolver()
// eslint-disable-next-line import/prefer-default-export
export class ProjectResolver {
// ** BASIC CRUD OPERATIONS ** \\

  @Query(() => [Project])
  projects(): Promise<Project[]> {
    return Project.find();
  }

  @Query(() => Project, { nullable: true })
  project(
    @Arg('id', () => Int) id: number ,
  ): Promise<Project | undefined> {
    return Project.findOne( id );
  }

  @Mutation(() => Project)
  // @UseMiddleware(auth) only loggedIn users can create/manipulate projects
  // remove ownerId from args after session implementation
  async createProject(
    @Arg('input') input: ProjectInput,
    @Arg('ownerId', () => Int) ownerId: number,
  ): Promise<Project> {
    return Project.create({ ...input,  ownerId}).save();
  }
  
  @Mutation(() => Project, { nullable: true })
    // @UseMiddleware(auth) only loggedIn users can create/manipulate projects
  // remove ownerId from args after session implementation
  async updateProject(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String) title: string,
    @Arg('description', () => String) description: string,
    @Arg('ownerId', () => Int) ownerId: number,
  ): Promise<Project | null> {
    // const project = await Project.findOne(id);
    // if (!project) {
    //   return null;
    // }
    // // if the text isnt blank
    // if (typeof title !== 'undefined' && typeof description !== 'undefined') {
    //   Project.update({id}, {title, description})
    // }
    // return project; 
    // using the query builder
    const project = await getConnection()
    .createQueryBuilder()
    .update(Project)
    .set({title, description})
    .where('id = :id and "ownerId" = :ownerId', {
      id,
      ownerId
    })
    .returning("*")
    .execute();
    return project.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await Project.delete(id)
    return true;
  }
}
