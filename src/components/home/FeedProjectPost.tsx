import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface Owner {
  name: string,
  username: string,
  image: string
}
interface PostProps {
  createdAt: Date,
  updatedAt: Date,
  id: number,
  ownerId: number,
  projectId: number,
  text: string,
  owner: Owner
}
interface Props {
  post: PostProps
}

export const FeedProjectPost: React.FC<Props> = ({ post }) => {
  const { createdAt, updatedAt, id, ownerId, projectId, text, owner } = post;

  dayjs.extend(relativeTime);
  const postedAt = dayjs().to(dayjs(createdAt));

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={10}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            { postedAt }
          </chakra.span>
          {/* <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{ bg: "gray.500" }}
          >
            Design
          </Link> */}
        </Flex>

        <Box mt={2}>
          {/* <Link

            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            Accessibility tools for designers and developers
          </Link> */}
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            { text }
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            href={`/projects/${projectId}`}
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
          >
            Checkout Project
          </Link>

          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src={ owner.image }
              alt="avatar"
            />
            <Link
              href={`/profile/${ownerId}`}
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {owner.name}
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

