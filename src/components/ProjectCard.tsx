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
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { loggedOutIcon } from './nextAuth';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import router from "next/dist/client/router";
import {FcNext} from 'react-icons/fc'
import {MdFavoriteBorder} from 'react-icons/md'


interface ProjectCardProps {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  // progress: number,
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, id, createdAt, updatedAt}) => {
  const [session] = useSession();
  dayjs.extend(relativeTime);
  const postedAt = dayjs().to(dayjs(createdAt)) 
  // need hook for query to get user by id
  // need hook for query to get user image
    return (
      <Flex>
    <Spacer>
      <Center py={6} px={2} >
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
            {title}
          </Heading>
          <Text color={'gray.500'}>
            {description}
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
            <Text color={'gray.500'}> {postedAt}</Text> {/* change to use project created at */}
          </Stack>

          <Flex>
            <Spacer>
        <FcNext onClick={()=> router.push(`/projects/${id}`)}></FcNext>
            </Spacer>
          </Flex>
        </Stack>
      </Box>
    </Center>
   </Spacer>
  </Flex>
  );
}

