/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  VStack,
  Link,
  Avatar,
  Heading,
  HStack,
  Text,
  Divider,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { NextComponentType, withUrqlClient } from "next-urql";
import React, { useContext, useEffect, useState } from "react";
import { FaPaperPlane, FaGlobe } from "react-icons/fa";
import { UserContext } from "../../../context/userContext";
import { useFollowUserMutation, useGetUserEmailQuery } from "../../../generated/graphql";


const MBProfileCard: NextComponentType = ({ profile }) => {
  // Given profile
  const { name, username, image, title, bio, website, id } = profile;

  // Logged in user's profile
  const { userProfile, addToFollowedUsers, usersFollowing, unfollowUser } = useContext(UserContext);
  const { id: currId } = userProfile;

  // Follows
  const [, followUser] = useFollowUserMutation();

  const plane = (): JSX.Element => {
    return (
      <Icon
        as={FaPaperPlane}
        boxSize={5}
      />
    )
  }

  const globe = (): JSX.Element => {
    return (
      <Icon
        as={FaGlobe}
        boxSize={5}
      />
    )
  }

  const [emailResult] = useGetUserEmailQuery({
    variables: { profileId: id },
  });

  const { data: emailData, fetching: emailFetching } = emailResult

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (!emailFetching && emailData?.getUserEmail) {
      const fetchedEmail = emailData.getUserEmail;
      if (fetchedEmail !== email) {
        setEmail(fetchedEmail);
      }
    }
  }, [emailData, emailFetching])

  return (
    <Box
      w="100%"
      h="100%"
      m="auto"
      boxShadow="0px 10px 13px -7px #000000"
    >
      <VStack
        m={4}
        spacing={4}
      >
        <VStack
          spacing={2}
        >
          <Link
            href={`/profile/${id}`}
          >
            <Avatar
              size="lg"
              src={image ? image : ""}
              alt={`${name} avatar`}
            />
          </Link>
          <VStack
            spacing={1}
          >
            <HStack>
              <Link
                href={`/profile/${id}`}
              >
                <Heading
                  size="sm"
                  as="h3"
                >
                  {name}
                </Heading>
              </Link>
              <Text> - </Text>
              <Link
                href={`/profile/${id}`}
              >
                <Heading
                  size="sm"
                  as="h3"
                >
                  {username}
                </Heading>
              </Link>
            </HStack>
          </VStack>
          <Heading
            size="xs"
            as="h4"
          >
            {title}
          </Heading>
          {currId != id ?
            (!usersFollowing.includes(id) ?
              <Button
                // flex={1}
                fontSize={'md'}
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
                  followUser({
                    profileId_2: id,
                    profileId_1: currId
                  })
                  addToFollowedUsers(id)
                }}
              >
                Follow
              </Button>
              :
              <Button
                onClick={() => unfollowUser(id)}
              >
                Unfollow
              </Button>
            ) :
            <></>
          }
        </VStack>
        {bio &&
          (
            <VStack
              spacing={4}
            >
              <Divider />
              <Text
                mt={4}
              >
                {bio.split('\n')[0]}
              </Text>
              {bio.split('\n').length > 1 &&
                <Text
                  mt={4}
                >
                  Read more on the full profile...
                </Text>
              }
            </VStack>
          )
        }
        <Divider />
        <VStack
          w="100%"
        >
          <HStack>
            {(currId && email && currId !== id && !emailFetching) &&
              <Link
                href={`mailto:${email}`}
              >
                <Button
                  leftIcon={plane()}
                  p={2}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('orange.200', 'orange.700'),
                  }}
                >
                  Contact
                </Button>
              </Link>
            }
            {website &&
              <Link
                href={website}
              >
                <Button
                  leftIcon={globe()}
                  p={2}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('orange.200', 'orange.700'),
                  }}
                >
                  Visit Website
                </Button>
              </Link>
            }
          </HStack>
          <Link
            href={`/profile/${id}`}
          >
            <Button
              p={2}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
            >
              View Full Profile
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  )
};

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(MBProfileCard);