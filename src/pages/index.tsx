import { withUrqlClient } from 'next-urql/';
import React from 'react';
import { Fragment } from 'react';
import { Flex, Grid, GridItem, Stack, HStack, VStack, Box, Col } from '@chakra-ui/react';

import UserPanel from '../components/home/UserPanel';
import MainFeed from '../components/home/MainFeed';
import Landing from '../components/home/Landing';
import { usePostsQuery } from '../generated/graphql';

const Home =  () => {
  const [{data}] =  usePostsQuery()
  return (
    <Landing />
   
  )
}

export default withUrqlClient(() => ({
  url: 'http://localhost:8080/graphql',
}))(Home);




{/* <Fragment> */}
      
     

{/* <Flex
  // maxW="1000px"
  w="100%"
  direction={["column", "column", "row", "row"]}
  justify="center"
  rounded="lg"
  p="6"
>
  <Flex align="center" mx="2" p="20">
    <UserPanel />
  </Flex>
  <Flex align="center" mx="2" p="20">
    <MainFeed />
  </Flex>
  <Flex align="center" mx="2" p="20">
    Side shit
  </Flex>

</Flex> */}


{/* <Stack direction={["column", "row"]} spacing="24px" width="100%" align="center">
  <Box alignContent="flex-start" w="30%" h="max-content" bg="yellow.200">
    <UserPanel />
  </Box>
  <Box w="30%" h="40px" bg="tomato">
    2
  </Box>
  <Box w="30%" h="40px" bg="pink.100">
    3
  </Box>
</Stack> */}
{/* <Flex
  direction="column"
  align="flex-start"
  // maxW={{}}
  m="0 auto"
>
  <UserPanel />
</Flex>

<Flex
  direction="column"
  align="center"
  m="0 auto"
>
  Main Feed
</Flex>

<Flex
  direction="column"
  align="flex-end"
  m="0 auto"
>
  Side Panel
</Flex> */}

// </Fragment>