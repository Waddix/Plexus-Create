import {
  Avatar,
  Box,
  Heading,
  VStack,
  Text
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react'
// import { ProjectsContext } from "../../context/projectsContext"
import { UserContext } from '../../context/userContext'
import { GetFollowedProjectsDocument, useGetFeedQuery, useGetPostsQuery } from '../../generated/graphql';
import Post from '../../models/posts/post';
import { FeedPosts } from './FeedPosts';
import { FeedProject } from './FeedProject';


export const Feed: React.FC = () => {
  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;

  const [{ fetching, data, error }] = useGetPostsQuery({ variables: { profileId: id } })
  if (fetching) {
    return <div>Hold up a sec big dawg</div>
  }
  else if (error) {
    console.error(error);
    return <div>{error.message}</div>
  } else {

    if (data) {
      console.log("here's that data, baby!", data)

      const allPosts: Array<Post> = [];
      data.getFeed?.followedProjects.map(project => (
        project.posts?.forEach((post: Post) => allPosts.push(post))
      ))
      data.getFeed?.following.forEach(user => (
        user.posts?.forEach(post => {
          if (!allPosts.includes(post)) {
            allPosts.push(post)
          }
        })
      ))

      // allPosts.sort((a, b) => a.createdAt - b.createdAt)
      console.log("All the posts: ", allPosts)
      return (
        <VStack
          // justifyContent="center"
          alignContent="center"
          w="100vw"
        >

          {

            allPosts.map(post => (
              <FeedPosts key={post.id} post={post} />
            ))

          }
          {/* {
            data.getFeed?.followedProjects.map(project => (
              <FeedProject key={project.id} project={project} />
            ))

          }
          {
            data.getFeed?.following.map(user => (

        ))
          } */}


          {/* Individual Cards
          <YourCardHere profile={profile} posts={posts} />
          <YourSecondCardHere project={project} posts={posts} /> */}

          {/* <Box
            w={["100%", "80%", "80%", "65%"]}
            border="solid 3px"
            borderColor="blue.200"
            // height="250px"
            my={8}
            h="max-content"
          >
            <Box
              margin="auto"
              textAlign="center"
              mt={2}
            >
              <Heading>Project Update</Heading>
            </Box>
            <Box
              pos="relative"
            >
              <VStack
                alignItems="center"
                w="max-content"
                my={["15px", "-40px", "-40px", "-40px"]}
                pos="absolute"
                top={0}
                left={5}
                bottom={0}
              >
                <Avatar
                  display={{ md: 'none' }}
                  src={userProfile.image}
                  size="md"
                />
                <Avatar
                  display={{ base: 'none', md: "flex" }}
                  src={userProfile.image}
                  size="lg"
                />
                <Heading
                  display={{ base: 'none', md: "flex" }}
                  size="md"
                >
                  {userProfile.name}
                </Heading>
                <Heading
                  display={{ base: 'block', md: "none" }}
                  size="sm"
                >
                  {userProfile.name}
                </Heading>
              </VStack>
            </Box>
            <VStack
              mt={2}
              mb={6}
              ml={["100", "125", "125", "125",]}
              pos="relative"
              alignItems="start"
              mr={2}
            >
              {/* {update.text.split('\n').map(line => {
              return (
                <Text>{line}</Text>
              )
            })} */}
          {/* <Text>This is a project update</Text>
     
            </VStack>
          </Box> */}
        </VStack >
      )
    }
    return (
      <h2> Hold Up </h2>
    )
  }
}
