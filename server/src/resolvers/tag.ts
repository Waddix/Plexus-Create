import { Project } from '../db/entities/Project';
import {
  Resolver, Query, Arg, Mutation, Int, Field, ObjectType
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Tag } from '../db/entities/Tag';


@ObjectType() 
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class TagResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(() => Tag, {nullable: true})
  tag?: Tag;
}
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

  @Query(() => [Tag])
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

  @Mutation(() => TagResponse)
  async createTag(
    @Arg('name', () => String) name: string,
  ): Promise<TagResponse> {
    let tag;
    try {
      tag = await Tag.create({ name }).save()
    } catch (error) {

      return {
        errors:[{
          field: 'name',
          message: 'Tag already exists'
        }]
      }
    }
    return {tag};
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
