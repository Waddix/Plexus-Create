import { useState, useEffect, createContext } from "react";

const ProjectsContext = createContext();

function ProjectsContextProvider({children}: { children:}) {
  const [projects, setProjects] = useState([]);
  const [top10Projects, setTop10Projects] = useState([]);


  const projectsProps = {
    projects,
    top10Projects
  }

  return (
    <ProjectsContext.Provider value={projectsProps}>
      {children}
    </ProjectsContext.Provider>
  )
}

export {ProjectsContextProvider, ProjectsContext};