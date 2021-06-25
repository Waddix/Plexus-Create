import { ReactElement, useContext } from 'react'
// import { ProjectsContext } from "../../context/projectsContext"
import { UserContext } from '../../context/userContext'

function MainFeed(): React.ReactElement {
  // const { projects } = useContext(ProjectsContext);
  const { projectsFollowing } = useContext(UserContext);

  const projectsFeed = projectsFollowing.map((project, i) => (
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