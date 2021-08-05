import {
  Box,
  // Image,
  SpaceProps,
  HStack,
  Tag,
  Container,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import { Wrapper } from "../../../components/forms/Wrapper";
import LoadingAnimation from "../../../components/loading";
// import { PositionForm } from "../../../components/projects/PositionForm";
import { ProjectDetails } from "../../../components/projects/ProjectDetails";
import { useProjectQuery } from "../../../generated/graphql";

interface ProjectTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const ProjectTags: React.FC<ProjectTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

const ProjectView: React.FC<unknown> = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const idToInt = typeof projectId === "string" ? parseInt(projectId) : 1;
  const [{ data, fetching }] = useProjectQuery({
    pause: idToInt === 0,

    variables: {
      id: idToInt,
    },
  });
  if (fetching) {
    return (<LoadingAnimation />);
  } else {
    return (
      <Container>
        <Head>
          <title>{data?.project?.title}</title>
          <meta
            property="og:title"
            content={`${data?.project?.title} ${data?.project?.description}`}
            key="title"
          />
        </Head>
        <Wrapper variant="regular">
          <Box mb={8}>
            {/* <Box>
              <Box alignContent="center" height="max-content">
                <Image
                  src="/PlexusProject3D.png"
                  alt="Project Image"
                  shadow="xl"
                  rounded="xl"
                ></Image>
              </Box>
            </Box> */}
            <Box>
              <Flex h="100%" flexDirection="column" justifyContent="center">
                <ProjectDetails
                  description={data?.project?.description}
                  title={data?.project?.title}
                  updatedAt={data?.project?.updatedAt}
                  createdAt={data?.project?.createdAt}
                  image={data?.project?.owner?.image}
                  username={data?.project?.owner.username}
                  id={idToInt}
                  ownerId={data?.project?.ownerId}
                  projectImage={data?.project?.image ? data?.project?.image : ""}
                ></ProjectDetails>
                <Divider orientation="horizontal" mt={4} />
                {/* <PositionForm id={data?.project?.id}></PositionForm> */}
              </Flex>
            </Box>
          </Box>
        </Wrapper>
      </Container>
    );
  }
};

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(ProjectView);
