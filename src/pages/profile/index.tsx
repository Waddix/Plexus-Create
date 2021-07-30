import React, { useContext } from "react";
import { Flex, SimpleGrid,Text } from '@chakra-ui/react'
import UserCard from "../../components/UserCard";
import { UserContext } from "../../context/userContext";
import { withUrqlClient } from "next-urql";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { useGetProjectsByUserQuery } from "../../generated/graphql";
import LoadingAnimation from "../../components/loading";

const ProfileView: React.FC = (): JSX.Element => {
  const { userProfile } = useContext(UserContext);
  const { id, username, image } = userProfile;

  const [{ fetching, data, error }] = useGetProjectsByUserQuery({ variables: { ownerId: id } })

  if (fetching) {
    return (<LoadingAnimation />)
  }
  else if (error) {
    return <div>{error.message}</div>
  } else {
    if (data) {
      return (
        <div>
          <Flex justify={'center'}>
            <UserCard profile={userProfile} currId={id} />
          </Flex>
          <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
            {data.getProjectsByUser?.map((p) => {
              return <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} username={username} image={image}> </ProjectCard>
            })}
          </SimpleGrid>
        </div>
      )
    }
  }
  return (
    <></>
  )
}

  export default withUrqlClient(() => ({
    // ...add your Client options here
    url: 'https://server-seven-blue.vercel.app/graphql',
  }))(ProfileView);