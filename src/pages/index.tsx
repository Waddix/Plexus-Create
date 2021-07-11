import { withUrqlClient } from 'next-urql/';
import React from 'react';
// import { Fragment } from 'react';
// import { Flex, Grid, GridItem, Stack, HStack, VStack, Box, Col } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
// import { MainFeed } from '../components/home/MainFeed';
// import FollowingFeed from '../components/home/FollowingFeed';
import Landing from '../components/home/Landing';
import Feed from '../components/home/Feed';


const Home = () => {
  const [session] = useSession();

  return (
    <div>
      {session ?
      <Feed />
        // <div>
        //   <MainFeed />
        //   <FollowingFeed />
        // </div>
        :
        <Landing />
      }
    </div>
  )
}
export default withUrqlClient(() => ({
  url: 'https://server-seven-blue.vercel.app/graphql',
}))(Home);

