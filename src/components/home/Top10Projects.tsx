import React, { ReactElement, useContext } from 'react'
import { ProjectsContext } from "../../context/projectsContext"
// import { UserContext } from '../../context/userContext'
import Project from '../../models/project';

function Top10Feed(): React.ReactElement {
  const { top10Projects } = useContext(ProjectsContext);

  const projectsFeed = top10Projects.map((project: Project, i: number) => (
    <div className="projectFeedItem" key={i}>{project.title}: {project.owner}</div>
  ))

  return (
    <>
     {projectsFeed.length ? projectsFeed : 'no projects yet' }
    </>
  )
}

export default Top10Feed;