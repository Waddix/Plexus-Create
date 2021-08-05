import React, { useContext } from 'react'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
  Spacer,
  Badge,
  Button,
  Link,
  Image
} from '@chakra-ui/react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { UserContext } from '../../context/userContext';
import { ProjectTagsByID } from './ProjectTagsByID';
// import { useFollowProjectMutation } from '../../generated/graphql';


interface ProjectCardProps {
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  updatedAt: Date,
  username?: string | undefined,
  image?: string | undefined,
  profileImage?: string | undefined
  ownerId?: number,
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, id, createdAt, username, image, profileImage, ownerId }) => {
  dayjs.extend(relativeTime);
  const postedAt = dayjs().to(dayjs(createdAt))

  //* use this once userContext is fixed
  const { userProfile, followProject, unfollowProject, projectsFollowing } = useContext(UserContext);

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
              h="max-content"
              bg={'gray.100'}
              mt={-6}
              mx={-6}
              mb={6}
            >
              <Image
                src={image && image.length > 0 ?
                  image
                  :
                  '/PlexusProject3D.png'
                }
                alt={title}
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
              <Stack direction="row">
                <ProjectTagsByID id={id}></ProjectTagsByID>
              </Stack>
              <Link href={`/projects/${id}`}>
                <Heading
                  color={useColorModeValue('gray.700', 'white')}
                  fontSize={'2xl'}
                  fontFamily={'body'}>
                  {title}
                </Heading>
              </Link>
              <Text color={'gray.500'}>
                {description}
              </Text>
            </Stack>
            {username ?
              <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Link href={`/profile/${ownerId}`} passHref={true}>
                  <Avatar
                    size={'md'}
                    src={profileImage}
                  />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{username}</Text>
                    <Text color={'gray.500'}> {postedAt}</Text>
                  </Stack>
                </Link>
                {ownerId != userProfile.id && !projectsFollowing.includes(id) ?
                  <Button
                    onClick={() => followProject({
                      profileId: userProfile.id,
                      projectId: id
                    })}
                  >
                    Follow
                  </Button>
                  :
                  (ownerId != userProfile.id ?
                    <Button
                      onClick={() => unfollowProject(id)}
                    >
                      Unfollow
                    </Button>
                    :
                    <></>
                  )

                }
              </Stack>
              :
              <div></div>
            }
          </Box>
        </Center>
      </Spacer>
    </Flex>
  );
}
