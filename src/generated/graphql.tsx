import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  createProject: Project;
  updateProject?: Maybe<Project>;
  deleteProject: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  type: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  type: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  ownerId: Scalars['String'];
  input: ProjectInput;
};


export type MutationUpdateProjectArgs = {
  ownerId: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  text: Scalars['String'];
  type: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  ownerId: Scalars['String'];
  owner: User;
};

export type ProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  ownerId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  post?: Maybe<Post>;
  projects: Array<Project>;
  project?: Maybe<Project>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  type: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'text' | 'type' | 'updatedAt' | 'createdAt'>
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput;
  ownerId: Scalars['String'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
  ) }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'text' | 'type' | 'createdAt' | 'updatedAt'>
  )> }
);


export const CreatePostDocument = gql`
    mutation CreatePost($type: String!, $text: String!) {
  createPost(type: $type, text: $text) {
    id
    text
    type
    updatedAt
    createdAt
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($input: ProjectInput!, $ownerId: String!) {
  createProject(input: $input, ownerId: $ownerId) {
    id
    title
    description
    createdAt
    updatedAt
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    text
    type
    createdAt
    updatedAt
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};