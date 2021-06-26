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
import {formatRelative, parseISO} from 'date-fns'


interface ProjectCardProps {
  // id: string,
 title: string,
 description: string,
 createdAt: string,
 updatedAt: string,
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, createdAt, updatedAt}) => {
  const [session] = useSession();
  // need hook for query to get user by id
  // need hook for query to get user image
    return (<Center py={6} px={2}>
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
            <Text color={'gray.500'}> {formatRelative(new Date(), new Date(parseISO(updatedAt)))}</Text> {/* change to use project created at */}
          </Stack>
        </Stack>
      </Box>
    </Center>);
}

