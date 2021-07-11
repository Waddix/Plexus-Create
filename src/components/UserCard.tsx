import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
// import { UserContext } from '../context/userContext'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { Profile, useFollowUserMutation } from '../generated/graphql';


interface profileProps {
  id: number,
  username: string,
  bio: string,
  image: string
}
interface userCardProps {
  currId: number,
  profile: profileProps
}

export const UserCard: React.FC<userCardProps> = ({ profile, currId }) => {
  const { id, username, bio, image } = profile;
  // const [, followUser] = useFollowUserMutation();
  const { usersFollowing, followUser } = useContext(UserContext);
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Link href={`/profile/${id}`}>
          <Avatar
            size={'xl'}
            src={
              image
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            { }
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {username}
          </Text>

        </Link>

        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          {bio}
          {/* You know what it is.{' '}
          Don't @ me
          {' '} */}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #music
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          {currId != id && !usersFollowing.includes(id) ?
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={() => {
                // await followUser({ profileId_2: currId, profileId_1: id })
                followUser(id);
              }}
            >
              Follow
            </Button>
            :
            <></>
            // <Fragment></Fragment>
          }
        </Stack>
      </Box>
    </Center>
  );
}

export default UserCard;
