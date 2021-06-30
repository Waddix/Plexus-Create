import { Project } from '../db/entities/Project';
import {
  Resolver, Query, Arg, Mutation, Int
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Tag } from '../db/entities/Tag';

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  tags(): Promise<Tag[]> {
    return Tag.find();
  }

  @Query(() => Tag, { nullable: true })
  tag(
    @Arg('id', () => Int) id: number,
  ): Promise<Tag | undefined> {
    return Tag.findOne(id);
  }

  @Query(() => [Tag], {nullable: true})
  async projectTags(
    @Arg('projectId', () => Int) projectId: number
  ): Promise<Tag[]> {
    
    const tags = await getConnection()
    .createQueryBuilder()
    .relation(Project, "tags")
    .of(projectId)
    .loadMany();

    return tags;
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg('name', () => String) name: string,
  ): Promise<Tag> {
    return Tag.create({ name }).save();
  }

  @Mutation(() => Boolean)
  async assignTag(
    @Arg('tagId', () => Int) tagId: number,
    @Arg('projectId', () => Int) projectId: number,
  ): Promise<Tag | boolean> {

      await getConnection()
      .createQueryBuilder()
      .relation(Project, "tags")
      .of(projectId)
      .add(tagId);

      return true;
    
  }
}
