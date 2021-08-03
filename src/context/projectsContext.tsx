import * as React from "react";
import { useState } from "react";
import Project from '../models/project';

//* work in progress. Still a little unclear on how contexts are defined in typescript
//* May need to use define interface, but not sure what properties it would take on.




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectsContext = React.createContext<any | null>(null);

//Todo create context to manage projects in state and provide that data to rest of the app
function ProjectsContextProvider({children}: { children: React.ReactNode }): React.ReactElement | null {
  const [projects, /*setProjects*/] = React.useState<Project[]>([]);
  const [top10Projects, /*setTop10Projects*/] = React.useState<Project[]>([]);
  const [projectTag, setProjectTag] = useState<string>('')
  
  const projectsProps = {
    projects,
    top10Projects,
    projectTag,
    setProjectTag,
  }

  // const sum = (x: number, y: number): number => x + y;

  return (
    <ProjectsContext.Provider value={projectsProps}>
      {children}
    </ProjectsContext.Provider>
  )
}

export {ProjectsContextProvider, ProjectsContext};