import {
  Avatar,
  Heading,
  HStack,
  Link,
  VStack
} from "@chakra-ui/react";
import React from "react";

const DTProfileCard = ({ profile }): JSX.Element => {
  const { name, username, image, title, email, bio, id } = profile;

  return (
    <HStack
      w="100%"
      h="100%"
      m="auto"
      border="2px solid blue"
      justifyContent="flex-start"
    >
      <VStack
        m={4}
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
      </VStack>
      <VStack
        w="100%"
        h="100%"
      >
        <VStack
          spacing={0}
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
        </VStack>
      </VStack>
    </HStack>
  )
};

export default DTProfileCard;