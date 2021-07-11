import { VStack } from '@chakra-ui/react';
import React, { useContext } from 'react'
// import { ProjectsContext } from "../../context/projectsContext"
import { UserContext } from '../../context/userContext'
import { useGetPostsQuery } from '../../generated/graphql';
import Post from '../../models/posts/post';
import { FeedPosts } from './FeedPosts';
// import { FeedProject } from './FeedProject';

const Feed: React.FC = () => {
  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;

  const [{ fetching, data, error }] = useGetPostsQuery({ variables: { profileId: id } })
  if (fetching) {
    return <div>Loading</div>
  }
  else if (error) {
    return <div>{error.message}</div>
  } else {

    if (data) {
      let allPosts: Array<Post> = [];
      data.getFeed?.followedProjects.forEach(project => (
        project?.posts?.forEach(post => allPosts.push(post))
        // allPosts = [...allPosts, ...project.posts]
      ))
      data.getFeed?.following.forEach(user => (
        user.posts?.forEach(post => {
          if (!allPosts.find(({ id }) => id === post.id)) {
            allPosts.push(post);
          }
        })
      ))

      return (
        <VStack
          alignContent="center"
          w="100vw"
        >
          {
            allPosts.map(post => (
              <FeedPosts key={post.id} post={post} />
            ))

          }

        </VStack >
      )
    }
    return (
      <h2> Hold Up </h2>
    )
  }
}
export default Feed;
