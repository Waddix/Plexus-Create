import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react"
import DTProjectCard from "../../components/cards/desktop/DTProjectCard";
import MBProjectCard from "../../components/cards/mobile/MBProjectCard";
import LoadingAnimation from "../../components/loading";
// import { ProjectCard } from "../../components/projects/ProjectCard";
import { useProjectsQuery } from "../../generated/graphql";

const ProjectsView: React.FC<unknown> = (): JSX.Element => {
  const [{ data, fetching }] = useProjectsQuery();
  return (
    <Box>
      {fetching ?
        (
          <LoadingAnimation />
        )
        :
        // <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
        //   {data?.projects?.map((p) => (
        //     <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} username={p.owner.username} image={p.image} profileImage={p.owner.image} ownerId={p.ownerId} />
        //   )
        //   )}
        // </SimpleGrid>
        (
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
              {data?.projects?.map((p) => (
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
              {data?.projects?.map((p) => (
                <DTProjectCard
                  key={p.title.replace(" ", "-").toLowerCase()}
                  project={p}
                />
              ))}
            </SimpleGrid>
          </Box>
        )
      }
    </Box>
  )
};

export default withUrqlClient(() => ({
  url: 'https://server-seven-blue.vercel.app/graphql',
}))(ProjectsView);