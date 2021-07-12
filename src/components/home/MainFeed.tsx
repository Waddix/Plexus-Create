// import React, { useContext, useEffect, useRef } from 'react'
// import { UserContext } from '../../context/userContext'
// import { useGetFollowedProjectsQuery} from '../../generated/graphql';
// import { SimpleGrid } from '@chakra-ui/react';
// import { ProjectCard } from '../projects/ProjectCard';

// export const MainFeed: React.FC = () => {
//   const isMounted = useRef(true)

//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, [])

//   const { userProfile } = useContext(UserContext);
//   const { id } = userProfile
//   const [{ data, error }] = useGetFollowedProjectsQuery({
//     variables: {
//       profileId: id
//     }
//   });

//   if (error) {
//     console.error(error);
//   }

//   useEffect(() => {
//     isMounted.current = true;
//   }, [data])

//   const projectsFeed = data?.getFollowedProjects?.map((p) => (
//     <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt}> </ProjectCard>
//   ));

//   return (
//     <div>
//       {isMounted ?
//         <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
//           {projectsFeed}
//         </SimpleGrid>
//         :
//         <h1>Well Fuck</h1>
//       }
//     </div>
//   )
// }

export{};