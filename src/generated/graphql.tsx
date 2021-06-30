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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Accounts = {
  __typename?: 'Accounts';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  compound_id: Scalars['String'];
  user_id: Scalars['Float'];
  provider_id: Scalars['String'];
  provider_account_id: Scalars['String'];
};


export type FollowProject = {
  __typename?: 'FollowProject';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  profileId: Scalars['Float'];
  projectId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  followProject: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  createProfile: Profile;
  createProject: Project;
  updateProject?: Maybe<Project>;
  deleteProject: Scalars['Boolean'];
};


export type MutationFollowProjectArgs = {
  profileId: Scalars['Int'];
  projectId: Scalars['Int'];
};


export type MutationFollowUserArgs = {
  profileId_2: Scalars['Int'];
  profileId_1: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  type: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  type: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProfileArgs = {
  input: ProfileInput;
};


export type MutationCreateProjectArgs = {
  ownerId: Scalars['Int'];
  input: ProjectInput;
};


export type MutationUpdateProjectArgs = {
  ownerId: Scalars['Int'];
  description: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  text: Scalars['String'];
  type: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user_id: Scalars['Int'];
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
  bio: Scalars['String'];
  website: Scalars['String'];
};

export type ProfileInput = {
  id: Scalars['Int'];
  user_id: Scalars['Int'];
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
  bio: Scalars['String'];
  website: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  description: Scalars['String'];
  ownerId: Scalars['Float'];
  owner: Profile;
};

export type ProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  tags: Array<Profile>;
  user?: Maybe<Profile>;
  followers?: Maybe<Array<Profile>>;
  posts: Array<Post>;
  post?: Maybe<Post>;
  getAllProfiles?: Maybe<Array<Profile>>;
  findProfileID: Profile;
  findProfileUserId: Profile;
  findProfileUsername: Profile;
  projects: Array<Project>;
  project?: Maybe<Project>;
  getAllUsers?: Maybe<Array<Users>>;
  findUserName?: Maybe<Users>;
  findUserEmail: Users;
  findUser: Users;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryFollowersArgs = {
  profileId: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryFindProfileIdArgs = {
  id: Scalars['Int'];
};


export type QueryFindProfileUserIdArgs = {
  user_id: Scalars['Int'];
};


export type QueryFindProfileUsernameArgs = {
  username: Scalars['String'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryFindUserNameArgs = {
  name: Scalars['String'];
};


export type QueryFindUserEmailArgs = {
  email: Scalars['String'];
};


export type QueryFindUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Sessions = {
  __typename?: 'Sessions';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Float'];
  expires: Scalars['DateTime'];
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image: Scalars['String'];
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

export type CreateProfileForUserMutationVariables = Exact<{
  input: ProfileInput;
}>;


export type CreateProfileForUserMutation = (
  { __typename?: 'Mutation' }
  & { createProfile: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'user_id' | 'name' | 'username' | 'email' | 'image' | 'title' | 'bio' | 'website' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  input: ProjectInput;
  ownerId: Scalars['Int'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
  ) }
);

export type FollowProjectMutationVariables = Exact<{
  profileId: Scalars['Int'];
  projectId: Scalars['Int'];
}>;


export type FollowProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followProject'>
);

export type GetAllProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProfilesQuery = (
  { __typename?: 'Query' }
  & { getAllProfiles?: Maybe<Array<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'name' | 'username' | 'image' | 'title' | 'bio' | 'website'>
  )>> }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers?: Maybe<Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'image'>
  )>> }
);

export type GetProfileIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProfileIdQuery = (
  { __typename?: 'Query' }
  & { findProfileID: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'name' | 'username' | 'image' | 'title' | 'bio' | 'website'>
  ) }
);

export type GetProfileUserIdQueryVariables = Exact<{
  user_id: Scalars['Int'];
}>;


export type GetProfileUserIdQuery = (
  { __typename?: 'Query' }
  & { findProfileUserId: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'name' | 'username' | 'image' | 'title' | 'bio' | 'website'>
  ) }
);

export type GetProfileUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetProfileUsernameQuery = (
  { __typename?: 'Query' }
  & { findProfileUsername: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'name' | 'username' | 'image' | 'title' | 'bio' | 'website'>
  ) }
);

export type GetUserQueryVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { findUser: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'email' | 'image'>
  ) }
);

export type GetUserEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserEmailQuery = (
  { __typename?: 'Query' }
  & { findUserEmail: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'email' | 'image'>
  ) }
);

export type GetUserNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetUserNameQuery = (
  { __typename?: 'Query' }
  & { findUserName?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'email' | 'image'>
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'text' | 'type' | 'createdAt' | 'updatedAt'>
  )> }
);

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'ownerId' | 'description' | 'createdAt' | 'updatedAt'>
    & { owner: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'username' | 'email'>
    ) }
  )> }
);

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'title' | 'description' | 'ownerId' | 'id' | 'createdAt' | 'updatedAt'>
    & { owner: (
      { __typename?: 'Profile' }
      & Pick<Profile, 'username'>
    ) }
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
export const CreateProfileForUserDocument = gql`
    mutation CreateProfileForUser($input: ProfileInput!) {
  createProfile(input: $input) {
    user_id
    name
    username
    email
    image
    title
    bio
    website
    createdAt
    updatedAt
  }
}
    `;

export function useCreateProfileForUserMutation() {
  return Urql.useMutation<CreateProfileForUserMutation, CreateProfileForUserMutationVariables>(CreateProfileForUserDocument);
};
export const CreateProjectDocument = gql`
    mutation CreateProject($input: ProjectInput!, $ownerId: Int!) {
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
export const FollowProjectDocument = gql`
    mutation followProject($profileId: Int!, $projectId: Int!) {
  followProject(profileId: $profileId, projectId: $projectId)
}
    `;

export function useFollowProjectMutation() {
  return Urql.useMutation<FollowProjectMutation, FollowProjectMutationVariables>(FollowProjectDocument);
};
export const GetAllProfilesDocument = gql`
    query GetAllProfiles {
  getAllProfiles {
    id
    name
    username
    image
    title
    bio
    website
  }
}
    `;

export function useGetAllProfilesQuery(options: Omit<Urql.UseQueryArgs<GetAllProfilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllProfilesQuery>({ query: GetAllProfilesDocument, ...options });
};
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    id
    name
    image
  }
}
    `;

export function useGetAllUsersQuery(options: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllUsersQuery>({ query: GetAllUsersDocument, ...options });
};
export const GetProfileIdDocument = gql`
    query GetProfileID($id: Int!) {
  findProfileID(id: $id) {
    id
    name
    username
    image
    title
    bio
    website
  }
}
    `;

export function useGetProfileIdQuery(options: Omit<Urql.UseQueryArgs<GetProfileIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileIdQuery>({ query: GetProfileIdDocument, ...options });
};
export const GetProfileUserIdDocument = gql`
    query GetProfileUserID($user_id: Int!) {
  findProfileUserId(user_id: $user_id) {
    id
    name
    username
    image
    title
    bio
    website
  }
}
    `;

export function useGetProfileUserIdQuery(options: Omit<Urql.UseQueryArgs<GetProfileUserIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileUserIdQuery>({ query: GetProfileUserIdDocument, ...options });
};
export const GetProfileUsernameDocument = gql`
    query GetProfileUsername($username: String!) {
  findProfileUsername(username: $username) {
    id
    name
    username
    image
    title
    bio
    website
  }
}
    `;

export function useGetProfileUsernameQuery(options: Omit<Urql.UseQueryArgs<GetProfileUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileUsernameQuery>({ query: GetProfileUsernameDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($name: String!, $email: String!) {
  findUser(name: $name, email: $email) {
    id
    name
    email
    image
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const GetUserEmailDocument = gql`
    query GetUserEmail($email: String!) {
  findUserEmail(email: $email) {
    id
    name
    email
    image
  }
}
    `;

export function useGetUserEmailQuery(options: Omit<Urql.UseQueryArgs<GetUserEmailQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserEmailQuery>({ query: GetUserEmailDocument, ...options });
};
export const GetUserNameDocument = gql`
    query GetUserName($name: String!) {
  findUserName(name: $name) {
    id
    name
    email
    image
  }
}
    `;

export function useGetUserNameQuery(options: Omit<Urql.UseQueryArgs<GetUserNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserNameQuery>({ query: GetUserNameDocument, ...options });
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
export const ProjectDocument = gql`
    query Project($id: Int!) {
  project(id: $id) {
    id
    title
    owner {
      username
      email
    }
    ownerId
    description
    createdAt
    updatedAt
  }
}
    `;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectQuery>({ query: ProjectDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects {
  projects {
    title
    description
    ownerId
    owner {
      username
    }
    id
    createdAt
    updatedAt
  }
}
    `;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};