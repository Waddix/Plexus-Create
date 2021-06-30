import React, { useState, ReactElement, ReactNode } from "react";

import Profile from '../models/profile';
import { useFollowProjectMutation } from "../generated/graphql";

import { Project } from "../models/project"

//* work in progress. Still a little unclear on how contexts are defined in typescript
//* May need to use define interface, but not sure what properties it would take on.




const UserContext = React.createContext({});

//Todo create context to manage projects in state and provide that data to rest of the app
function UserContextProvider({ children }: { children: ReactNode }): ReactElement | null {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [projectsFollowing, setProjectsFollowing] = useState<Project[]>([]);
  const [tagsFollowing, setTagsFollowing] = useState([])
  const [userProfile, setUserProfile] = useState<Profile>({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [, followP] = useFollowProjectMutation();

  const followProject = async (project: Project) => {
   await followP({profileId: userProfile.id, projectId: project.id});
   setProjectsFollowing((prevProjects) => {
     return [...prevProjects, project];
   })
  
  

  };

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
    setNewUser
  }

  // const sum = (x: number, y: number): number => x + y;

  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext };