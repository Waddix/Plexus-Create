import React, { useState,  } from "react";
import {
  useFollowProjectMutation,
  Project,
  Profile,
  Tag,
} from "../generated/graphql";

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
  const [projectsFollowing, setProjectsFollowing] = useState<Project[]>([]);
  const [tagsFollowing, setTagsFollowing] = useState<Tag[]>([])
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [, followP] = useFollowProjectMutation();
  const followProject = (projectId: number) => {
    followP({
      profileId: userProfile.id,
      projectId: projectId
    });
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
  }


  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContextProvider, UserContext };
