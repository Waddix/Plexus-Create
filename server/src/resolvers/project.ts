/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import {
  Resolver, Query, Ctx, Arg, Mutation, Int,
} from 'type-graphql';
import {Project} from '../db/entities/Project';
import { PlexusContext } from '../types';

@Resolver()
// eslint-disable-next-line import/prefer-default-export
export class ProjectResolver {
// ** BASIC CRUD OPERATIONS ** \\

  @Query(() => [Project])
  projects(@Ctx() { em }: PlexusContext): Promise<Project[]> {
    return em.find(Project, {});
  }

  @Query(() => Project, { nullable: true })
  project(
    @Arg('id', () => String) id: string ,
    @Ctx() { em }: PlexusContext,
  ): Promise<Project | null> {
    return em.findOne(Project, { id });
  }

  @Mutation(() => Project)
  async createProject(
    @Arg('title', () => String) title: string,
    @Arg('description', () => String) description: string,
    @Arg('owner', () => Int) owner: number,
    @Ctx() { em }: PlexusContext,
  ): Promise<Project> {
    const project = em.create(Project, { title, description, owner });
    await em.persistAndFlush(project);
    return project;
  }

  @Mutation(() => Project, { nullable: true })
  async updateProject(
    @Arg('id', () => String) id: string,
    @Arg('title', () => String) title: string,
    @Arg('description', () => String) description: string,
    @Ctx() { em }: PlexusContext,
  ): Promise<Project | null> {
    const project = await em.findOne(Project, { id });
    if (!project) {
      return null;
    }
    // if the text isnt blank
    if (typeof title !== 'undefined' && typeof description !== 'undefined') {
      project.title = title;
      project.description = description;
      await em.persistAndFlush(Project);
    }
    return project;
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Arg('id', () => String) id: string,
    @Ctx() { em }: PlexusContext,
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Project, { id });
    } catch {
      return false;
    }
    return true;
  }
}
