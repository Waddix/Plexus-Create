/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import {
  Resolver, Query, Ctx, Arg, Mutation, Int
} from 'type-graphql';
import Post from '../db/entities/Post';
import { PlexusContext } from '../types';

@Resolver()
// eslint-disable-next-line import/prefer-default-export
export class PostResolver {
// ** BASIC CRUD OPERATIONS ** \\

  @Query(() => [Post])
  posts(@Ctx() { em }: PlexusContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id', () => Int) id: number ,
    @Ctx() { em }: PlexusContext,
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('text', () => String) text: string,
    @Arg('type', () => String) type: string,
    @Ctx() { em }: PlexusContext,
  ): Promise<Post> {
    const post = em.create(Post, { text, type });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('text', () => String, { nullable: true }) text: string,
    @Arg('type', () => String) type: string,
    @Ctx() { em }: PlexusContext,
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    // if the text isnt blank
    if (typeof text !== 'undefined' && typeof type !== 'undefined') {
      post.text = text;
      await em.persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: PlexusContext,
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { id });
    } catch {
      return false;
    }
    return true;
  }
}
