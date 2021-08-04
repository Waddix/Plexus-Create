import React, { useContext } from "react";
import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import UserCard from "../../components/UserCard";
import { UserContext } from "../../context/userContext";
import { withUrqlClient } from "next-urql";
// import { ProjectCard } from "../../components/projects/ProjectCard";
import { useGetProjectsByUserQuery } from "../../generated/graphql";
import LoadingAnimation from "../../components/loading";
import DTProjectCard from "../../components/cards/desktop/DTProjectCard";
import MBProjectCard from "../../components/cards/mobile/MBProjectCard";

const ProfileView: React.FC = (): JSX.Element => {
  const { userProfile } = useContext(UserContext);
  const { id/*, username, image*/ } = userProfile;

  const [{ fetching, data/*, error */ }] = useGetProjectsByUserQuery({ variables: { ownerId: id } })

  if (fetching) {
    return (<LoadingAnimation />)
  } else {
    if (data) {
      return (
        <div>
          <Flex justify={'center'}>
            <UserCard profile={userProfile} currId={id} />
          </Flex>
          {/* <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
            {data.getProjectsByUser?.map((p) => {
              return <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} username={username} image={image}> </ProjectCard>
            })}
          </SimpleGrid> */}
          <Box
            w={["95%", "95%", "90%", "80%"]}
            mx="auto"
            mt={6}
            mb={6}
            textAlign="center"
          >
            <VStack
              d={{ base: "flex", md: "none" }}
              m="auto"
              w="100%"
            >
              {data.getProjectsByUser?.map((p) => (
                <MBProjectCard
                  key={p.title.replace(" ", "-").toLowerCase()}
                  project={p}
                />
              ))}
            </VStack>
            <SimpleGrid
              columns={[2, null, 3]}
              spacing="20px"
              maxBlockSize="fit-content"
              mb={6}
              d={{ base: "none", md: "grid" }}
            >
              {data.getProjectsByUser?.map((p) => (
                <DTProjectCard
                  key={p.title.replace(" ", "-").toLowerCase()}
                  project={p}
                />
              ))}
            </SimpleGrid>
          </Box>
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