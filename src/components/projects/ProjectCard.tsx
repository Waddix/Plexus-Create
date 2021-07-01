import React, {useContext} from 'react'
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
  Badge,
  Button
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { loggedOutIcon } from '../auth/nextAuth';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import router from "next/dist/client/router";
import { FcNext } from 'react-icons/fc'
// import { UserContext } from '../../context/userContext';


interface ProjectCardProps {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  username?: string | undefined
  image?: string | undefined
  // progress: number,
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, id, createdAt, updatedAt, username, image }) => {
  dayjs.extend(relativeTime);
  const postedAt = dayjs().to(dayjs(createdAt))
  updatedAt = dayjs().to(dayjs(updatedAt));
  //* use this once userContext is fixed
  // const { followProject } = useContext(UserContext);
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
              <Stack direction="row">
                <Badge
                  fontSize="0.8em"
                  colorScheme="blue"
                  textTransform={'uppercase'}
                  letterSpacing={1.1}
                  fontWeight={800}
                  variant="solid"
                >
                  Project
                </Badge>
              </Stack>
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
                <Avatar
                  size={'md'}
                  src={image}
                />
              <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontWeight={600}>{username}</Text>
                <Text color={'gray.500'}> {postedAt}</Text> 
              </Stack>
              <Flex>
                <Spacer>
                  <FcNext onClick={() => router.push(`/projects/${id}`)}></FcNext>
                </Spacer>
                {/* <Button
                  onClick={() => followProject(id, session.user.id)}
                >
                Follow
              </Button> */}
              </Flex>
            </Stack>
          </Box>
        </Center>
      </Spacer>
    </Flex>
  );
}

