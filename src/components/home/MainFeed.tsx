import React, { ReactElement, useContext } from 'react'
// import { ProjectsContext } from "../../context/projectsContext"
import { UserContext } from '../../context/userContext'
import Project from '../../models/project';

function MainFeed(): React.ReactElement {
  const { projectsFollowing } = useContext(UserContext);

  // need to add onClick that routes to 'projects/[projectId]'
    const projectsFeed = projectsFollowing.map((project: Project, i: number) => (
    <div className="projectFeedItem" key={i}>{project.title}: {project.owner}</div>
  ))
  console.log(projectsFollowing)
  return (
    <>
     {projectsFeed.length ? projectsFeed : 'no projects following' }
    </>
  )
}

export default MainFeed;