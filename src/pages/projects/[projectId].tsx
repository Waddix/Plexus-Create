import {
  Box,
  Image,
  SpaceProps,
  HStack,
  Tag,
  Container,
  Flex,
  Button,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext } from "react";
import { Wrapper } from "../../components/forms/Wrapper";
import { ProjectDetails } from "../../components/projects/ProjectDetails";
import { UserContext } from "../../context/userContext";
import { useProjectQuery } from "../../generated/graphql";

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
  const { userProfile } = useContext(UserContext);

  const [{ data, error, fetching }] = useProjectQuery({
    pause: idToInt === 0, // this pauses the query on project id 0 bc ik we dont have a project id 0 but it is unneccessary

    variables: {
      id: idToInt, /// this is only because i am using the route as id otherwise pass in variables like so
    },
  });

  console.log(data);
  if (fetching) {
    return <div>loading</div>;
  }
  if (error) {
    console.log(error.message);
    return <div>{error.message}</div>;
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
            <Box>
              <Box alignContent="center" height="max-content">
                <Image
                  src="/PlexusProject3D.png"
                  alt="Project Image"
                  shadow="xl"
                  rounded="xl"
                ></Image>
              </Box>
            </Box>
            <Box>
              <Flex h="100%" flexDirection="column" justifyContent="center">
                <ProjectDetails
                  description={data?.project?.description}
                  title={data?.project?.title}
                  updatedAt={data?.project?.updatedAt}
                  createdAt={data?.project?.createdAt}
                  image={data?.project?.owner?.image}
                  username={data?.project?.owner.username}
                  id={parseInt(projectId)}
                  ownerId={data?.project?.ownerId}
                ></ProjectDetails>
                {/* {userProfile.id === projectId ?
                  <Button
                    onClick={() => console.log("let's update")}
                  >
                    Update
                  </Button> :
                  <></>
                } */}
              </Flex>
            </Box>
          </Box>
        </Wrapper>
      </Container>
    );
  }
};

export default withUrqlClient(
  () => ({
    // ...add your Client options here
    url: "http://localhost:8080/graphql",
  }),
  { ssr: true }
)(ProjectView);
