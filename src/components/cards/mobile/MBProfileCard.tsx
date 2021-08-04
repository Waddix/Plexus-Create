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
import React from "react";
import { FaPaperPlane, FaGlobe } from "react-icons/fa";
import Tags from "../../auth/forms/tags";

const MBProfileCard = ({ profile }): JSX.Element => {
  const { name, username, image, title, email, bio, website, id } = profile;

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
    <Box
      w="100%"
      h="100%"
      m="auto"
      border="2px solid blue"
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
            {email &&
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

export default MBProfileCard;