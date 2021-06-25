import {
  Resolver, Query, Arg, Mutation, Int
} from 'type-graphql';
import {Post} from '../db/entities/Post';

@Resolver()
// eslint-disable-next-line import/prefer-default-export
export class PostResolver {
// ** BASIC CRUD OPERATIONS ** \\

  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id', () => Int) id: number ,
  ): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('text', () => String) text: string,
    @Arg('type', () => String) type: string,
  ): Promise<Post> {
    return Post.create({text, type}).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id', () => String) id: string,
    @Arg('text', () => String, { nullable: true }) text: string,
    @Arg('type', () => String) type: string,
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    // if the text isnt blank
    if (typeof text !== 'undefined' && typeof type !== 'undefined') {
     Post.update({id}, {text, type})
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id', () => String) id: string,
  ): Promise<boolean> {
    await Post.delete(id)
    return true;
  }
}
