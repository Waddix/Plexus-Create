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
  Spacer
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaPaperPlane, FaGlobe } from "react-icons/fa";
import { withUrqlClient } from "next-urql";
import { UserContext } from "../../../context/userContext";
import { useGetUserEmailQuery } from "../../../generated/graphql";

const MBProfileCard = ({ profile }): JSX.Element => {
  const { name, username, image, title, bio, website, id } = profile;

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

  const user = useContext(UserContext);
  const { userProfile: currUser } = user

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
        <VStack
          w="100%"
        >
          {/* TODO: ADD FOLLOW BUTTON */}
          <Divider />
          <Box mt={4}></Box>
          <HStack>
            {(email && currUser.id !== id && !emailFetching) &&
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