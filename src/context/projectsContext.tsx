import { useState, createContext, ReactNode, ReactElement } from "react";

//* work in progress. Still a little unclear on how contexts are defined in typescript
//* May need to use define interface, but not sure what properties it would take on.


const ProjectsCtx = createContext();

//Todo create context to manage projects in state and provide that data to rest of the app
function ProjectsCtxProvider({children}: { children: ReactNode }): ReactElement | null {
  const [projects, setProjects] = useState<[]>([]);
  const [top10Projects, setTop10Projects] = useState<[]>([]);


  const projectsProps = {
    projects,
    top10Projects
  }

  return (
    <ProjectsCtx.Provider value={projectsProps}>
      {children}
    </ProjectsCtx.Provider>
  )
}

export {ProjectsCtxProvider, ProjectsCtx};