import {
  Box,
  VStack,
  Link,
  Heading,
  Divider,
  Button,
  Text,
  Image,
  HStack,
  Spacer,
  Tag,
  Badge,
  Collapse,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useFollowProjectMutation } from "../../../generated/graphql";

const DTProjectCard = ({ project }): JSX.Element => {
  const { title, description, image, tags, position, id, ownerId } = project;
  const { userProfile, projectsFollowing, addToFollowedProjects, unfollowProject } = useContext(UserContext);
  const { id: currId } = userProfile;
  const [, followProject] = useFollowProjectMutation();

  const [showMore, setShowMore] = useState<boolean>(false);

  interface Tag {
    name: string,
  }

  return (
    <Box
      w="100%"
      h="100%"
      m="auto"
      boxShadow="0px 10px 13px -7px #000000"
    >
      <VStack
        // m={6}
        h="100%"
        alignContent="center"
        justifyContent="end"
      >
        <Link
          href={`/projects/${id}`}
        >
          <Image
            src={image ? image : ""}
            alt={`${title} image`}
          />
        </Link>
        <VStack
          m={4}
          spacing={4}
        >
          <Link
            href={`/projects/${id}`}
          >
            <Heading
              size="md"
              as="h2"
            >
              {title}
            </Heading>
          </Link>
          <Box>
            <Text
              mt={2}
            >
              {description.split('\n')[0]}
            </Text>
            {description.split('\n').length > 1 &&
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
                    {description.split('\n').splice(1).map((bioLine: string) => (
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
          <VStack
            w="100%"
          >
            {(tags || position) &&
              <HStack
                w="100%"
                alignContent="center"
                justifyContent="space-between"
                h="100%"
                mb={2}
              >
                <Spacer />
                {tags &&
                  tags.map(({ name }: Tag) => {
                    return (
                      <Tag
                        key={name.replace(" ", "-").toLowerCase()}
                        variant="solid"
                        size="md"
                        borderRadius="full"
                      >
                        {name}
                      </Tag>
                    )
                  })
                }
                <Spacer />
                {position &&
                  (
                    <Badge
                      colorScheme="green"
                      size="md"
                      px={2}
                      py={1}
                    >
                      Open Positions
                    </Badge>
                  )
                }
              </HStack>
            }
            {ownerId != currId ?
              (!projectsFollowing.includes(id) ?
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
                    followProject({
                      profileId: currId,
                      projectId: id
                    })
                    addToFollowedProjects(id)
                  }
                  }
                >
                  Follow
                </Button>
                :
                <Button
                  onClick={() => unfollowProject(id)}
                >
                  Unfollow
                </Button>
              )
              :
              <></>
            }
            <Divider />
            <Link
              href={`/projects/${id}`}
            >
              <Button
                mb={4}
                p={2}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
              >
                View Project Page
              </Button>
            </Link>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
};

export default DTProjectCard;