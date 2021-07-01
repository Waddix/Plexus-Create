import React, { useState, ReactElement, ReactNode } from "react";

import { useFollowProjectMutation, useFollowUserMutation, useGetFollowedProjectsQuery, useGetFollowedUsersQuery } from "../generated/graphql";

import Profile from '../models/profile';
import Project from "../models/project"


//* work in progress. Still a little unclear on how contexts are defined in typescript
//* May need to use define interface, but not sure what properties it would take on.


//! what to pass pass in here for type????
const UserContext = React.createContext<React.FC | null>(null);

//Todo create context to manage projects in state and provide that data to rest of the app
function UserContextProvider({ children }: { children: ReactNode }): ReactElement | null {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [projectsFollowing, setProjectsFollowing] = useState<Project[]>([]);
  const [usersFollowing, setUsersFollowing] = useState<Profile[]>([]);
  const [tagsFollowing, setTagsFollowing] = useState([])
  const [userProfile, setUserProfile] = useState<Profile>({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [, followP] = useFollowProjectMutation();
  const [, followU] = useFollowUserMutation();
  const [, getFollowProj] = useGetFollowedProjectsQuery();
  const [, getFollowUsers] = useGetFollowedUsersQuery();

  const followProject = async (project: Project) => {
    await followP({ profileId: userProfile.id, projectId: project.id });
    setProjectsFollowing((prevProjects) => {
      return [...prevProjects, project];
    })
  };

  const followUser = async (user: Profile) => {
    await followU({ profileId_1: userProfile.id, profileId_2: user.id })
  }

  const getProjectsFollowing = async () => {
    const projects = await getFollowProj({ profileId: userProfile.id });
    setProjectsFollowing(projects);
  }
  const getUsersFollowing = async () => {
    const followedUsers = await getFollowUsers({ profileId: userProfile.id });
    setUsersFollowing(followedUsers);
  }

  const userProps = {
    userProjects,
    projectsFollowing,
    tagsFollowing,
    userProfile,
    setUserProfile,
    followProject,
    loadingProfile,
    setLoadingProfile,
    newUser,
    setNewUser,
    followUser,
    getProjectsFollowing,
    getUsersFollowing
  }

  // const sum = (x: number, y: number): number => x + y;

  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext };