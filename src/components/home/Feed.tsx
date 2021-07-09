import React, { useContext, useEffect, useRef } from 'react'
// import { ProjectsContext } from "../../context/projectsContext"
import { UserContext } from '../../context/userContext'
import { useGetFeedQuery} from '../../generated/graphql';


export const Feed: React.FC = () => {
  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;

  const [{ fetching, data, error }] = useGetFeedQuery({ variables: { profileId: id } })
  if (fetching) {
    return <div>Hold up a sec big dawg</div>
  }
  else if (error) {
    console.error(error);
    return <div>{error.message}</div>
  } else {

    if (data) {
      console.log("here's that data, baby!", data)


      // need to add onClick that routes to 'projects/[projectId]'
      // const projectsFeed = data?.getFollowedProjects?.map((p, i) => (
      //   <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt}> </ProjectCard>
      // ));

      return (
        <div>
          <h2>New Feed</h2>
        </div>

      )
    }
    return (
      <h2> Hold Up </h2>
    )
  }
}
