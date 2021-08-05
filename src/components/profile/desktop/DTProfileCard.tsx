/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Link,
  VStack,
  Text,
  Collapse,
  Button,
  useColorModeValue,
  Tooltip,
  Icon
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaPaperPlane, FaGlobe } from "react-icons/fa";
import { NextComponentType, withUrqlClient } from "next-urql";
import { UserContext } from "../../../context/userContext";
import { useFollowUserMutation, useGetUserEmailQuery } from "../../../generated/graphql";

const DTProfileCard: NextComponentType = (props) => {
  console.log(props);
  // Given profile
  const { name, username, image, title, bio, website, id } = props.profile;

  // Logged in user's profile
  const { userProfile, addToFollowedUsers, usersFollowing, unfollowUser } = useContext(UserContext)
  const { id: currId } = userProfile;

  // Follows
  const [, followUser] = useFollowUserMutation();

  // The show more button
  const [showMore, setShowMore] = useState<boolean>(false);

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

  return (
    <HStack
      w="100%"
      h="100%"
      m="auto"
      boxShadow="0px 10px 13px -7px #000000"
      justifyContent="flex-start"
    >
      <VStack
        m={4}
        spacing={4}
      >
        <Link
          href={`/profile/${id}`}
        >
          <Avatar
            size="xl"
            src={image ? image : ""}
            alt={`${name} avatar`}
          />
        </Link>
        <Link
          href={`/profile/${id}`}
        >
          <Heading
            size="md"
            as="h3"
          >
            {username}
          </Heading>
        </Link>
        <HStack>
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
          {(currId && email && currId !== id && !emailFetching) &&
            <Tooltip
              hasArrow
              openDelay={200}
              label="Opens email client"
            >
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
            </Tooltip>
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
      </VStack>
      <VStack
        w="100%"
        h="100%"
      >
        <VStack
          spacing={0}
          my={6}
          ml={2}
          mr={4}
        >
          <Heading
            as="h2"
          >
            <Link
              href={`/profile/${id}`}
            >
              <Heading
                size="md"
                as="h3"
              >
                {name}
              </Heading>
            </Link>
          </Heading>
          {title &&
            (
              <Heading
                size="sm"
                as="h2"
              >
                {title}
              </Heading>
            )
          }
          {bio &&
            <Box>
              <Text
                mt={2}
              >
                {bio.split('\n')[0]}
              </Text>
              {bio.split('\n').length > 1 &&
                <Box>
                  {!showMore &&
                    <Button
                      p={2}
                      m={2}
                      mb={0}
                      onClick={() => setShowMore(!showMore)}
                      variant="link"
                      color='orange.500'
                    >
                      Show More ...
                    </Button>
                  }
                  <Collapse
                    in={showMore}
                    animateOpacity
                  >
                    <Box>
                      {bio.split('\n').splice(1).map((bioLine: string) => (
                        <Text
                          key={bioLine.split(".")[0].replace(" ", "-").toLowerCase()}
                          mt={2}
                        >
                          {bioLine}
                        </Text>
                      ))}
                    </Box>
                  </Collapse>
                  {showMore &&
                    <Button
                      p={2}
                      m={2}
                      mb={0}
                      onClick={() => setShowMore(!showMore)}
                      variant="link"
                      color='orange.500'
                    >
                      ... Show Less
                    </Button>
                  }
                </Box>
              }
            </Box>
          }
        </VStack>
      </VStack>
    </HStack>
  )
};

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(DTProfileCard);