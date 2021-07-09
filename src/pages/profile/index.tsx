import React, { useContext } from "react";
import { Flex, SimpleGrid } from '@chakra-ui/react'
import UserCard from "../../components/UserCard";
import { UserContext } from "../../context/userContext";
import { withUrqlClient } from "next-urql";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { useGetProjectsByUserQuery } from "../../generated/graphql";

const ProfileView: React.FC<unknown> = () => {
  // const { projectsFollowing } = useContext(UserContext);
  const { userProfile } = useContext(UserContext);
  const { id, username, image } = userProfile;

  const [{ fetching, data, error }] = useGetProjectsByUserQuery({ variables: { ownerId: id } })

  if (fetching) {
    return <div>Hold up a sec big dawg</div>
  }
  else if (error) {
    console.error(error);
    return <div>{error.message}</div>
  } else {
    if (data) {
      return (
        <div>
          <Flex justify={'center'}>
            <UserCard profile={userProfile} currId={id} />
          </Flex>
          <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
            {data.getProjectsByUser?.map((p, i) => {
              return <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} username={username} image={image}> </ProjectCard>
            })}
          </SimpleGrid>
        </div>
      )
    }
  }
}

  export default withUrqlClient(() => ({
    // ...add your Client options here
    url: 'http://localhost:8080/graphql',
  }))(ProfileView);