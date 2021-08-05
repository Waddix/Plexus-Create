import {
  Box,
  HStack,
  Link,
  VStack,
  Heading,
  Spacer,
  Tag,
  Badge,
  Divider,
  Button,
  Image,
  Text
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useFollowProjectMutation } from "../../../generated/graphql";

const MBProjectCard = ({ project }): JSX.Element => {
  const { title, description, image, tags, position, id, ownerId } = project;
  const { userProfile, projectsFollowing, addToFollowedProjects, unfollowProject } = useContext(UserContext);
  const { id: currId } = userProfile;
  const [, followProject] = useFollowProjectMutation();

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
        m={4}
        spacing={4}
      >
        <Box>
          <Link
            href={`/projects/${id}`}
          >
            <Image
              src={image ? image : ""}
              alt={`${title} image`}
            />
          </Link>
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
        </Box>
        <VStack
          // m={4}
          spacing={4}
        >
          <VStack
            spacing={4}
          >
            <Text>
              {description.split('\n')[0]}
            </Text>
            {description.split('\n').length > 1 &&
              <Text
                mt={4}
              >
                Read more by viewing the project page...
              </Text>
            }
          </VStack>
          <VStack
            w="100%"
            h="100%"
          >
            {(tags || position) &&
              <VStack
                w="100%"
                alignContent="center"
                justifyContent="space-between"
                h="100%"
                mb={2}
                spacing={4}
              >
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
              </VStack>
            }
            {ownerId != currId ?
              (!projectsFollowing.includes(id) ?
                <Button
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
                mt={2}
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

export default MBProjectCard;