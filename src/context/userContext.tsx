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

//Todo create context to manage projects in state and provide that data to rest of the app
function UserContextProvider({ children }: { children: any }): any {
  const [userProfile, setUserProfile] = useState<any>({});
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [projectsFollowing, setProjectsFollowing] = useState<Project[]>([]);
  const [usersFollowing, setUsersFollowing] = useState<Profile[]>([]);
  const [tagsFollowing, setTagsFollowing] = useState<Tag[]>([])
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [, followP] = useFollowProjectMutation();
  const [, followU] = useFollowUserMutation();
  const [, getFollowProj] = useGetFollowedProjectsQuery();
  const [, getFollowUsers] = useGetFollowedUsersQuery();

  // const [{ data: allProjects, error }] = useProjectsQuery();



  const followProject = (projectId: number) => {
    console.log("projectId: ", projectId)
    followP({
      profileId: userProfile.id,
      projectId: projectId
    });
  }

  //   // setProjectsFollowing((prevProjects) => {

  //   //   return [...prevProjects, project];
  //   // })
  // };

  const followUser = async (user: Profile) => {
    await followU({ profileId_1: parseInt(userProfile.id), profileId_2: parseInt(user.id) })
  }

  //! Fix this
  const getProjectsFollowing = async () => {
    const projects = await getFollowProj({
      variables: {
        profileId: userProfile.id
      }
    });
    setProjectsFollowing(projects);
  }

  //! And this
  const getUsersFollowing = async () => {
    getFollowUsers({ profileId: userProfile.id });
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