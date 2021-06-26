import React from 'react'
import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { loggedOutIcon } from './nextAuth';


// interface CardWithImageProps {

// }

export const CardWithImage: React.FC<unknown> = ({}) => {
  console.log(__dirname)
  const [session] = useSession();
    return (<Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={
              '/PlexusProject3D.png'
            }
            layout={'fill'}
            alt={"project image"}
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {"Project"}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {"Project Title"}
          </Heading>
          <Text color={'gray.500'}>
            {"Project Description"}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        {session?.user?.image ?
                  <Avatar
                    size={'md'}
                    src={session.user.image}
                  />
                  :
                  <Icon as={loggedOutIcon} />}
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{session?.user?.name || 'not logged in'}</Text>
            <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text> {/* change to use project created at */}
          </Stack>
        </Stack>
      </Box>
    </Center>);
}

