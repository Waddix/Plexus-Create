import {
  Box,
  VStack,
  Link,
  Avatar,
  Heading,
  HStack,
  Text
} from "@chakra-ui/react";
import React from "react";

const MBProfileCard = ({ profile }): JSX.Element => {
  const { name, username, image, title, email, bio, website, id } = profile;

  return (
    <Box
      w="100%"
      h="100%"
      m="auto"
      border="2px solid blue"
    >
      <VStack
        m={4}
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
          <Heading
            size="xs"
            as="h4"
          >
            {title}
          </Heading>
        </VStack>
        {/* TODO: Add separator. Add bio. Add contact and website button. Add view profile button. */}
      </VStack>
    </Box>
  )
};

export default MBProfileCard;