import React, { useState, ReactElement, ReactNode } from "react";

import {
  useFollowProjectMutation,
  useFollowUserMutation,
  useGetFollowedProjectsQuery,
  useGetFollowedUsersQuery,
  useProjectsQuery,
  Project,
  Profile,
  Tag,
  FollowUserDocument,
} from "../generated/graphql";

// import Profile from '../models/profile';
// import Project from "../models/project"


//* work in progress. Still a little unclear on how contexts are defined in typescript
//* May need to use define interface, but not sure what properties it would take on.

// interface userContextInterface {
//   userProjects: [Project];
//   projectsFollowing: [Project];
//   usersFollowing: [Profile];
//   tagsFollowing: [Tag];
//   userProfile: Profile;
//   loadingProfile: boolean;
//   newUser: boolean;
//   followP:
// }

//! what to pass pass in here for type????
const UserContext = React.createContext<any | null>(null);

interface userSettings {
  theme: string,
  mode: 'light' | 'dark',
  accessability: {
    underlineLinks: boolean,
    dyslexicFont: boolean,
  }
}

//Todo create context to manage projects in state and provide that data to rest of the app
function UserContextProvider({ children }: { children: any }): any {
  const [userProfile, setUserProfile] = useState<Profile | Record<string, never>>({});
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [projectsFollowing, setProjectsFollowing] = useState<number[]>([]);
  const [usersFollowing, setUsersFollowing] = useState<number[]>([]);
  const [tagsFollowing, setTagsFollowing] = useState<Tag[]>([])
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [, followP] = useFollowProjectMutation();
  const [, followU] = useFollowUserMutation();
  // const [, getFollowProj] = useGetFollowedProjectsQuery();
  // const [, getFollowUsers] = useGetFollowedUsersQuery();
  // const [userSettings, setUserSettings] = useState<userSettings | null>(null)

  // const [{ data: allProjects, error }] = useProjectsQuery();

  // const addToFollowedProjects = (projectId: number) => {
  //   setProjectsFollowing(followed => [...followed, projectId])
  // }

  // const addToFollowedUsers = (profileId: number) => {
  //   setProjectsFollowing(followed => [...followed, profileId])
  // }

  const followProject = async (projectId: number) => {
    await followP({
      profileId: userProfile.id,
      projectId: projectId
    });
    setProjectsFollowing(followed => {
      return [...followed, projectId];
    })
  }


  const followUser = async (userId: number) => {
    await followU({
      profileId_2: userProfile.id,
      profileId_1: userId
    });
    setUsersFollowing(followed => {
      return [...followed, userId];
    })
  }




  // const followUser = async (userId: number) => {
  //   await followU({ profileId_1: parseInt(userProfile.id), profileId_2: userId })
  // }

  //** Having issues getting the following functions to work. */
  //** May refactor to use these later so we can manage state and api calls from here */
  //** For now, just calling graphql hooks from components  */
  // const getProjectsFollowing = () => {
  //   const projects = getFollowProj({
  //     variables: {
  //       profileId: userProfile.id
  //     }
  //   });
  //   setProjectsFollowing(projects);
  // }


  // const getUsersFollowing = async () => {
  //   const users = await getFollowUsers({
  //     variables: {
  //       profileId: userProfile.id
  //     }
  //   });
  //   setUsersFollowing(users);
  // }

  const userProps = {
    userProjects,
    projectsFollowing,
    tagsFollowing,
    userProfile,
    setUserProfile,
    loadingProfile,
    setLoadingProfile,
    newUser,
    setNewUser,
    usersFollowing,
    followProject,
    followUser
    // getProjectsFollowing,
    // getUsersFollowing
  }

  // const sum = (x: number, y: number): number => x + y;

  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext };