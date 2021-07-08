import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../db/entities/Post";
import { Project } from "../db/entities/Project";
import { Profile } from "../db/entities/Profile";

@Resolver()
// eslint-disable-next-line import/prefer-default-export
export class PostResolver {
  // ** BASIC CRUD OPERATIONS ** \\

  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  // @Query(() => [Post], {nullable: true})
  // async postsByUser(
  //   @Arg("ownerId", () => Int) ownerId: number
  // ): Promise<Post[]> {
  //   const following =
  // }

  @Query(() => Post)

  @Mutation(() => Post)
  async createPost(
    @Arg("text", () => String) text: string,
    @Arg("ownerId", () => Int) ownerId: number,
    @Arg("projectId", () => Int) projectId: number
  ): Promise<Post> {
    const newPost = await Post.create({ text, ownerId }).save();
    await getConnection()
      .createQueryBuilder()
      .relation(Profile, "posts")
      .of(ownerId)
      .add(newPost.id);
    await getConnection()
      .createQueryBuilder()
      .relation(Project, "posts")
      .of(projectId)
      .add(newPost.id);
    return newPost;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("text", () => String, { nullable: true }) text: string,
    // @Arg("type", () => String) type: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    // if the text isnt blank  //!took out type for now. may want to add it back later
    if (typeof text !== "undefined" ) {
      Post.update({ id }, { text });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
