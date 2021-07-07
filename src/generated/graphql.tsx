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


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  followProject: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  createTag: TagResponse;
  assignTag: Scalars['Boolean'];
  createPosition: PositionResponse;
  assignPosition: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  createProfile: Profile;
  createProject: Project;
  updateProject?: Maybe<Project>;
  deleteProject: Scalars['Boolean'];
  createPaymentIntent: Scalars['String'];
  createStripeLink: Scalars['String'];
  createStripeAccount: Scalars['String'];
};


export type MutationFollowProjectArgs = {
  projectId: Scalars['Int'];
  profileId: Scalars['Int'];
};


export type MutationFollowUserArgs = {
  profileId_2: Scalars['Int'];
  profileId_1: Scalars['Int'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationAssignTagArgs = {
  projectId: Scalars['Int'];
  tagId: Scalars['Int'];
};


export type MutationCreatePositionArgs = {
  projectId: Scalars['Int'];
  input: PositionInput;
};


export type MutationAssignPositionArgs = {
  projectId: Scalars['Int'];
  positionId: Scalars['Int'];
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


export type MutationCreatePaymentIntentArgs = {
  stripeId: Scalars['String'];
};


export type MutationCreateStripeLinkArgs = {
  stripeId: Scalars['String'];
};

export type Position = {
  __typename?: 'Position';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  projectId: Scalars['Float'];
  project: Project;
  tags: Array<Tag>;
};

export type PositionInput = {
  title: Scalars['String'];
  type: Scalars['String'];
  description: Scalars['String'];
};

export type PositionResponse = {
  __typename?: 'PositionResponse';
  errors?: Maybe<Array<FieldError>>;
  position?: Maybe<Position>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  text: Scalars['String'];
  type: Scalars['String'];
  tags: Array<Tag>;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
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
  stripeId: Scalars['String'];
  projects: Array<Project>;
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
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  description: Scalars['String'];
  ownerId: Scalars['Float'];
  owner: Profile;
  tags: Array<Tag>;
  position: Array<Position>;
};

export type ProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getFollowedProjects?: Maybe<Array<Project>>;
  user?: Maybe<Profile>;
  getFollowedUsers?: Maybe<Array<Profile>>;
  tags: Array<Tag>;
  tag?: Maybe<Tag>;
  projectTags: Array<Tag>;
  positions: Array<Position>;
  position?: Maybe<Position>;
  projectPositions: Array<Position>;
  posts: Array<Post>;
  post?: Maybe<Post>;
  getAllProfiles?: Maybe<Array<Profile>>;
  profileLookup: Profile;
  findProfileID: Profile;
  findProfileUserId: Profile;
  findProfileUsername: Profile;
  projects: Array<Project>;
  project?: Maybe<Project>;
  getProjectsByUser?: Maybe<Array<Project>>;
  createCheckoutSession: Scalars['String'];
  getAllUsers?: Maybe<Array<Users>>;
  findUserName?: Maybe<Users>;
  findUserEmail: Users;
  findUser: Users;
};


export type QueryGetFollowedProjectsArgs = {
  profileId: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryGetFollowedUsersArgs = {
  profileId: Scalars['Int'];
};


export type QueryTagArgs = {
  id: Scalars['Int'];
};


export type QueryProjectTagsArgs = {
  projectId: Scalars['Int'];
};


export type QueryPositionArgs = {
  id: Scalars['Int'];
};


export type QueryProjectPositionsArgs = {
  projectId: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryProfileLookupArgs = {
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


export type QueryGetProjectsByUserArgs = {
  ownerId: Scalars['Int'];
};


export type QueryCreateCheckoutSessionArgs = {
  id: Scalars['Int'];
  amount: Scalars['Int'];
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

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
};

export type TagResponse = {
  __typename?: 'TagResponse';
  errors?: Maybe<Array<FieldError>>;
  tag?: Maybe<Tag>;
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

export type TagFragmentFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'id' | 'name' | 'createdAt' | 'updatedAt'>
);

export type AssignProjectTagMutationVariables = Exact<{
  projectId: Scalars['Int'];
  tagId: Scalars['Int'];
}>;


export type AssignProjectTagMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'assignTag'>
);

export type CreatePositionMutationVariables = Exact<{
  input: PositionInput;
  projectId: Scalars['Int'];
}>;


export type CreatePositionMutation = (
  { __typename?: 'Mutation' }
  & { createPosition: (
    { __typename?: 'PositionResponse' }
    & { position?: Maybe<(
      { __typename?: 'Position' }
      & Pick<Position, 'id' | 'type' | 'title' | 'description'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

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

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = (
  { __typename?: 'Mutation' }
  & { createTag: (
    { __typename?: 'TagResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, tag?: Maybe<(
      { __typename?: 'Tag' }
      & TagFragmentFragment
    )> }
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

export type FollowUserMutationVariables = Exact<{
  profileId_2: Scalars['Int'];
  profileId_1: Scalars['Int'];
}>;


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followUser'>
);

export type AllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsQuery = (
  { __typename?: 'Query' }
  & { tags: Array<(
    { __typename?: 'Tag' }
    & TagFragmentFragment
  )> }
);

export type CreateCheckoutSessionQueryVariables = Exact<{
  id: Scalars['Int'];
  amount: Scalars['Int'];
}>;


export type CreateCheckoutSessionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'createCheckoutSession'>
);

export type FindTagByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindTagByIdQuery = (
  { __typename?: 'Query' }
  & { tag?: Maybe<(
    { __typename?: 'Tag' }
    & TagFragmentFragment
  )> }
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

export type GetFollowedProjectsQueryVariables = Exact<{
  profileId: Scalars['Int'];
}>;


export type GetFollowedProjectsQuery = (
  { __typename?: 'Query' }
  & { getFollowedProjects?: Maybe<Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
  )>> }
);

export type GetFollowedUsersQueryVariables = Exact<{
  profileId: Scalars['Int'];
}>;


export type GetFollowedUsersQuery = (
  { __typename?: 'Query' }
  & { getFollowedUsers?: Maybe<Array<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'name' | 'username' | 'image' | 'title' | 'bio' | 'website'>
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

export type ProjectTagsByIdQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type ProjectTagsByIdQuery = (
  { __typename?: 'Query' }
  & { projectTags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  )> }
);

export type GetProjectsByUserQueryVariables = Exact<{
  ownerId: Scalars['Int'];
}>;


export type GetProjectsByUserQuery = (
  { __typename?: 'Query' }
  & { getProjectsByUser?: Maybe<Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'description'>
  )>> }
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

export type ProfileLookupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProfileLookupQuery = (
  { __typename?: 'Query' }
  & { profileLookup: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'name' | 'username' | 'title' | 'bio' | 'website' | 'image'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
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
      & Pick<Profile, 'username' | 'image'>
    ), tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )> }
  )> }
);

export type ProjectPositionsQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type ProjectPositionsQuery = (
  { __typename?: 'Query' }
  & { projectPositions: Array<(
    { __typename?: 'Position' }
    & Pick<Position, 'id' | 'type' | 'title' | 'description' | 'projectId'>
  )> }
);

export type ProjectTagsQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;


export type ProjectTagsQuery = (
  { __typename?: 'Query' }
  & { projectTags: Array<(
    { __typename?: 'Tag' }
    & TagFragmentFragment
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
      & Pick<Profile, 'username' | 'image'>
    ), tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )> }
  )> }
);

export const TagFragmentFragmentDoc = gql`
    fragment tagFragment on Tag {
  id
  name
  createdAt
  updatedAt
}
    `;
export const AssignProjectTagDocument = gql`
    mutation assignProjectTag($projectId: Int!, $tagId: Int!) {
  assignTag(projectId: $projectId, tagId: $tagId)
}
    `;

export function useAssignProjectTagMutation() {
  return Urql.useMutation<AssignProjectTagMutation, AssignProjectTagMutationVariables>(AssignProjectTagDocument);
};
export const CreatePositionDocument = gql`
    mutation createPosition($input: PositionInput!, $projectId: Int!) {
  createPosition(input: $input, projectId: $projectId) {
    position {
      id
      type
      title
      description
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreatePositionMutation() {
  return Urql.useMutation<CreatePositionMutation, CreatePositionMutationVariables>(CreatePositionDocument);
};
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
export const CreateTagDocument = gql`
    mutation CreateTag($name: String!) {
  createTag(name: $name) {
    errors {
      field
      message
    }
    tag {
      ...tagFragment
    }
  }
}
    ${TagFragmentFragmentDoc}`;

export function useCreateTagMutation() {
  return Urql.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument);
};
export const FollowProjectDocument = gql`
    mutation followProject($profileId: Int!, $projectId: Int!) {
  followProject(profileId: $profileId, projectId: $projectId)
}
    `;

export function useFollowProjectMutation() {
  return Urql.useMutation<FollowProjectMutation, FollowProjectMutationVariables>(FollowProjectDocument);
};
export const FollowUserDocument = gql`
    mutation followUser($profileId_2: Int!, $profileId_1: Int!) {
  followUser(profileId_2: $profileId_2, profileId_1: $profileId_1)
}
    `;

export function useFollowUserMutation() {
  return Urql.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument);
};
export const AllTagsDocument = gql`
    query allTags {
  tags {
    ...tagFragment
  }
}
    ${TagFragmentFragmentDoc}`;

export function useAllTagsQuery(options: Omit<Urql.UseQueryArgs<AllTagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTagsQuery>({ query: AllTagsDocument, ...options });
};
export const CreateCheckoutSessionDocument = gql`
    query createCheckoutSession($id: Int!, $amount: Int!) {
  createCheckoutSession(id: $id, amount: $amount)
}
    `;

export function useCreateCheckoutSessionQuery(options: Omit<Urql.UseQueryArgs<CreateCheckoutSessionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CreateCheckoutSessionQuery>({ query: CreateCheckoutSessionDocument, ...options });
};
export const FindTagByIdDocument = gql`
    query findTagById($id: Int!) {
  tag(id: $id) {
    ...tagFragment
  }
}
    ${TagFragmentFragmentDoc}`;

export function useFindTagByIdQuery(options: Omit<Urql.UseQueryArgs<FindTagByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindTagByIdQuery>({ query: FindTagByIdDocument, ...options });
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
export const GetFollowedProjectsDocument = gql`
    query getFollowedProjects($profileId: Int!) {
  getFollowedProjects(profileId: $profileId) {
    id
    title
    description
    createdAt
    updatedAt
  }
}
    `;

export function useGetFollowedProjectsQuery(options: Omit<Urql.UseQueryArgs<GetFollowedProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFollowedProjectsQuery>({ query: GetFollowedProjectsDocument, ...options });
};
export const GetFollowedUsersDocument = gql`
    query getFollowedUsers($profileId: Int!) {
  getFollowedUsers(profileId: $profileId) {
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

export function useGetFollowedUsersQuery(options: Omit<Urql.UseQueryArgs<GetFollowedUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetFollowedUsersQuery>({ query: GetFollowedUsersDocument, ...options });
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
export const ProjectTagsByIdDocument = gql`
    query projectTagsById($projectId: Int!) {
  projectTags(projectId: $projectId) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useProjectTagsByIdQuery(options: Omit<Urql.UseQueryArgs<ProjectTagsByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectTagsByIdQuery>({ query: ProjectTagsByIdDocument, ...options });
};
export const GetProjectsByUserDocument = gql`
    query getProjectsByUser($ownerId: Int!) {
  getProjectsByUser(ownerId: $ownerId) {
    id
    createdAt
    updatedAt
    title
    description
  }
}
    `;

export function useGetProjectsByUserQuery(options: Omit<Urql.UseQueryArgs<GetProjectsByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProjectsByUserQuery>({ query: GetProjectsByUserDocument, ...options });
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
export const ProfileLookupDocument = gql`
    query profileLookup($id: Int!) {
  profileLookup(id: $id) {
    id
    name
    username
    title
    bio
    website
    image
    projects {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
}
    `;

export function useProfileLookupQuery(options: Omit<Urql.UseQueryArgs<ProfileLookupQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfileLookupQuery>({ query: ProfileLookupDocument, ...options });
};
export const ProjectDocument = gql`
    query Project($id: Int!) {
  project(id: $id) {
    id
    title
    owner {
      username
      image
    }
    tags {
      name
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
export const ProjectPositionsDocument = gql`
    query projectPositions($projectId: Int!) {
  projectPositions(projectId: $projectId) {
    id
    type
    title
    description
    projectId
  }
}
    `;

export function useProjectPositionsQuery(options: Omit<Urql.UseQueryArgs<ProjectPositionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectPositionsQuery>({ query: ProjectPositionsDocument, ...options });
};
export const ProjectTagsDocument = gql`
    query projectTags($projectId: Int!) {
  projectTags(projectId: $projectId) {
    ...tagFragment
  }
}
    ${TagFragmentFragmentDoc}`;

export function useProjectTagsQuery(options: Omit<Urql.UseQueryArgs<ProjectTagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectTagsQuery>({ query: ProjectTagsDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects {
  projects {
    title
    description
    ownerId
    owner {
      username
      image
    }
    tags {
      name
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