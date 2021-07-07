import { Project } from '../db/entities/Project';
import {
  Resolver, Query, Arg, Mutation, Int, Field, ObjectType, InputType
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Position } from '../db/entities/Position';
import { FieldError } from './tag';

@InputType()
class PositionInput {
  @Field(() => String)
  title: string

  @Field(() => String)
  type: string

  @Field(() => String)
  description: string
}

@ObjectType()
class PositionResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(() => Position, {nullable: true})
  position?: Position;
}
@Resolver()
export class PositionResolver {
  @Query(() => [Position])
  positions(): Promise<Position[]> {
    return Position.find({relations: ["tags", "project"]});
  }

  @Query(() => Position, { nullable: true })
  position(
    @Arg('id', () => Int) id: number,
  ): Promise<Position | undefined> {
    return Position.findOne(id);
  }

  @Query(() => [Position])
  async projectPositions(
    @Arg('projectId', () => Int) projectId: number
  ): Promise<Position[]> {
    const positions = await getConnection()
    .createQueryBuilder()
    .relation(Project, "position")
    .of(projectId)
    .loadMany();

    return positions;
  }

  @Mutation(() => PositionResponse)
  async createPosition(
    @Arg('input', () => PositionInput) input: PositionInput,
    @Arg('projectId', () => Int) projectId: number,
  ): Promise<PositionResponse> {
    let position;
    try {
      position = await Position.create({ ...input, projectId }).save()
    } catch (error) {
      return {
        errors:[{
          field: 'title',
          message: 'Position already exists'
        }]
      }
    }
    return {position};
  }

  @Mutation(() => Boolean)
  async assignPosition(
    @Arg('positionId', () => Int) positionId: number,
    @Arg('projectId', () => Int) projectId: number,
  ): Promise<Position | boolean> {

      await getConnection()
      .createQueryBuilder()
      .relation(Project, "positions")
      .of(projectId)
      .add(positionId);

      return true;
    
  }
}
