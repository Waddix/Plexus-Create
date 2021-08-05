import React, { useState, } from "react";
import {
  useFollowProjectMutation,
  Project,
  Profile,
  Tag,
  useFollowUserMutation,
} from "../generated/graphql";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserContext = React.createContext<any | null>(null);
// interface userSettings {
//   theme: string,
//   mode: 'light' | 'dark',
//   accessability: {
//     underlineLinks: boolean,
//     dyslexicFont: boolean,
//   }
// }

//Todo create context to manage projects in state and provide that data to rest of the app
function UserContextProvider({ children }: { children: unknown }): JSX.Element {
  const [userProfile, setUserProfile] = useState<Profile | Record<string, never>>({});
  const [userProjects/*, setUserProjects*/] = useState<Project[]>([]);
  const [projectsFollowing, setProjectsFollowing] = useState<number[]>([]);
  const [usersFollowing, setUsersFollowing] = useState<number[]>([]);
  const [tagsFollowing/*, setTagsFollowing*/] = useState<Tag[]>([])
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [, followP] = useFollowProjectMutation();
  const [, followU] = useFollowUserMutation();

  //? graphql hook not working within function. Call from component
  //? and pass addToFollowed instead for now
  const followProject = (projectId: number) => {
     followP({
      profileId: userProfile.id,
      projectId: projectId
    });
    setProjectsFollowing(followed => {
      return [...followed, projectId];
    })
  }

  const addToFollowedProjects = (projectId: number) => {
    setProjectsFollowing(followed => {
      return [...followed, projectId];
    })
  }

  const unfollowProject = (projectId: number) => {
    setProjectsFollowing(followed => {
      let index = followed.indexOf(projectId)
      let copy = followed.slice();
      copy.splice(index, 1)
      return copy
    })
  }

  //? graphql hook not working within function. Call from component
  //? and pass addToFollowed instead for now
  const followUser = (userId: number) => {
    followU({
      profileId_2: userProfile.id,
      profileId_1: userId
    });
    setUsersFollowing(followed => {
      return [...followed, userId];
    })
  }

  const addToFollowedUsers = (userId: number) => {
    setUsersFollowing(followed => {
      return [...followed, userId];
    })
  }

  const unfollowUser = (userId: number) => {
    setUsersFollowing(followed => {
      let index = followed.indexOf(userId)
      let copy = followed.slice();
      copy.splice(index, 1)
      return copy
    })
  }

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
    addToFollowedProjects,
    addToFollowedUsers,
    followUser,
    unfollowProject,
    unfollowUser
  }


  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContextProvider, UserContext };
