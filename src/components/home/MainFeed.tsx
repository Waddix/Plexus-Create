import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react'
// import { ProjectsContext } from "../../context/projectsContext"
import { UserContext } from '../../context/userContext'
import { useGetFollowedProjectsQuery, useGetFollowedUsersQuery } from '../../generated/graphql';

// import { withUrqlClient } from "next-urql";
import { SimpleGrid } from '@chakra-ui/react';
import { ProjectCard } from '../projects/ProjectCard';

export const MainFeed: React.FC = () => {
  // const { projectsFollowing } = useContext(UserContext);
  const isMounted = useRef(true)
  const [projects, useProjects] = useState([])

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [])

  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;
  console.log("here is the profile id: ", id)

  const [{ fetching, data, error }] = useGetFollowedProjectsQuery({
    variables: {
      profileId: id
    }
  });
  console.log(data?.getFollowedProjects);
  // const { getFollowedProjects } = data;
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    isMounted.current = true;
  }, [data])
  // const [{ data: usersData, error: usersErr }] = useGetFollowedUsersQuery(id);
  // console.log(usersData);
  // if (usersErr) {
  //   console.error(usersErr);
  // }

  // need to add onClick that routes to 'projects/[projectId]'
  const projectsFeed = data?.getFollowedProjects?.map((p, i) => (
    <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt}> </ProjectCard>
  ));

  const fetchingFeed = <h3>Fetching Feed</h3>
  // console.log(projectsFollowing)
  return (
    <div>
      {   isMounted ?
          <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
            {projectsFeed}
          </SimpleGrid>
          :
          <h1>Well Fuck</h1>
      }
    </div>

  )
}
