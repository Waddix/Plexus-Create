import React from "react";
import { useRouter } from "next/dist/client/router";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
// import { UserCard } from "../../components/UserCard";
import { useProfileLookupQuery } from "../../generated/graphql";
// import { UserContext } from "../../context/userContext";
import { withUrqlClient } from "next-urql";
// import { ProjectCard } from "../../components/projects/ProjectCard";
import LoadingAnimation from "../../components/loading";
import DTProjectCard from "../../components/cards/desktop/DTProjectCard";
import MBProjectCard from "../../components/cards/mobile/MBProjectCard";
import { AppProps } from "next/app";
import DTProfileCard from "../../components/profile/desktop/DTProfileCard";
import MBProfileCard from "../../components/profile/mobile/MBProfileCard";

function UserProfile(pageProps: AppProps) {
  // const { userProfile } = useContext(UserContext);
  // const { id } = userProfile;
  const router = useRouter();
  const { userId } = router.query;
  const userIdInt = typeof userId === "string" ? parseInt(userId) : 0;

  const [{ fetching, data }] = useProfileLookupQuery({
    variables: { id: userIdInt },
  });
  if (fetching) {
    return (<LoadingAnimation />);
  } else {
    // const { username, image } = data?.profileLookup;
    return (
      <VStack
        spacing={{ base: 4, lg: 8 }}
        m={{ base: 2, lg: 4 }}
      >
        {/* <Flex justify={"center"}>
          <UserCard profile={data?.profileLookup} currId={id} />
        </Flex> */}
        {/* <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
            {data?.profileLookup?.projects?.map((p) => {
              return <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} image={p.image} username={username} profileImage={image}> </ProjectCard>
            })}
            
          </SimpleGrid> */}
        <Box
          d={{ base: "none", md: "flex" }}
        >
          <DTProfileCard
            {...pageProps}
            profile={data?.profileLookup}
          />
        </Box>
        <Box
          d={{ base: "flex", md: "none" }}
        >
          <MBProfileCard
            {...pageProps}
            profile={data?.profileLookup}
          />
        </Box>
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
            {data?.profileLookup?.projects?.map((p) => (
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
            {data?.profileLookup?.projects?.map((p) => (
              <DTProjectCard
                key={p.title.replace(" ", "-").toLowerCase()}
                project={p}
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    );
  }
}

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(UserProfile);
