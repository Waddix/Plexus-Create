import {
  Box,
  SpaceProps,
  HStack,
  Tag,
  Container,
  Flex,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import { Wrapper } from "../../../components/forms/Wrapper";
import LoadingAnimation from "../../../components/loading";
import { ProjectDetails } from "../../../components/projects/ProjectDetails";
import { useProjectQuery } from "../../../generated/graphql";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton } from "react-share";
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
    return <LoadingAnimation />;
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
                  projectImage={
                    data?.project?.image ? data?.project?.image : ""
                  }
                ></ProjectDetails>
                <Divider orientation="horizontal" mt={4} />
                <Box>
                  <Heading fontSize="lg" mt={3} mb={4}>
                    Share this Project!
                  </Heading>
                  <HStack>
                    <FacebookShareButton
                      url={`https://plexuscreate.com/projects/${projectId}`}
                      quote={"Check out this project on Plexus Create!"}
                      hashtag={"#plexuscreate"}
                      className="fb-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://plexuscreate.com/projects/${projectId}`}
                      title={"Check out this project on Plexus Create!"}
                      hashtags={["#plexuscreate"]}
                      className="twitter-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <PinterestShareButton
                      url={`https://plexuscreate.com/projects/${projectId}`}
                      description={"Check out this project on Plexus Create!"}
                      media={data?.project?.image || ''}
                      className="pinterest-button"
                    >
                      <PinterestIcon size={32} round />
                    </PinterestShareButton>
                    <RedditShareButton
                      url={`https://plexuscreate.com/projects/${projectId}`}
                      title={`Check out ${data?.project?.title} on Plexus Create!`}
                      className="reddit-button"
                    >
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                  </HStack>
                </Box>
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
