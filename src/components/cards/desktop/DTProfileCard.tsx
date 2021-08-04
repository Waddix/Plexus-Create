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
  Divider,
  Icon
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPaperPlane, FaGlobe } from "react-icons/fa";

const DTProfileCard = ({ profile }): JSX.Element => {
  const { name, username, image, title, email, bio, website, id } = profile;

  const [showMore, setShowMore] = useState<boolean>(false);

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
        {/* TODO: ADD FOLLOW BUTTON */}
        {email &&
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
          <VStack
            w="100%"
            my={4}
          >
            <Divider />
            <Link
              href={`/profile/${id}`}
            >
              <Button
                p={2}
                mt={4}
                mb={2}
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
      </VStack>
      {/* TODO: Add view profile button. */}
    </HStack>
  )
};

export default DTProfileCard;