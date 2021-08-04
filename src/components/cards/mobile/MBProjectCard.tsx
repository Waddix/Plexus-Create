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
import React from "react";

const MBProjectCard = ({ project }): JSX.Element => {
  const { title, description, image, tags, position, id } = project;
  return (
    <Box
      w="100%"
      h="100%"
      m="auto"
      border="2px solid blue"
    >
      <HStack
        m={6}
        h="100%"
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
          {description &&
            (
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
            )
          }
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
                  tags.map((tag: string) => (
                    <Tag
                      key={tag.replace(" ", "-").toLowerCase()}
                      variant="solid"
                      size="md"
                      borderRadius="full"
                    >
                      {tag}
                    </Tag>
                  ))
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
            {/* TODO: ADD FOLLOW BUTTON */}
            <Divider />
            <Link
              href={`/projects/${id}`}
            >
              <Button
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
      </HStack>
    </Box>
  )
};

export default MBProjectCard;