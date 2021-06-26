import * as React from "react";
import Project from '../models/project';
import User from '../models/user';

//* work in progress. Still a little unclear on how contexts are defined in typescript
//* May need to use define interface, but not sure what properties it would take on.




const UserContext = React.createContext({});

//Todo create context to manage projects in state and provide that data to rest of the app
function UserContextProvider({children}: { children: React.ReactNode }): React.ReactElement | null {
  const [userInfo, setUserInfo] = React.useState<User>({});
  const [userProjects, setUserProjects] = React.useState<Project[]>([]);
  const [projectsFollowing, setProjectsFollowing] = React.useState<Project[]>([]);
  const [tagsFollowing, setTagsFollowing] = React.useState([])


  const userProps = {
    userInfo,
    userProjects,
    projectsFollowing,
    tagsFollowing
  }

  // const sum = (x: number, y: number): number => x + y;

  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext};