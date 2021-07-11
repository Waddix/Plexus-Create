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
import Post from "../../models/posts/post";

interface PostProps {
  post: Post
}

export const FeedPosts: React.FC<PostProps> = ({ post }) => {
  const { createdAt, updatedAt, id, text, owner, project } = post;
  console.log("FEEDPOST COMPONENT: ", post)
  dayjs.extend(relativeTime);
  const postedAt = dayjs().to(dayjs(createdAt));

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
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
        {/* <Flex justifyContent="space-between" alignItems="center">

          <Link
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
          </Link>
        </Flex> */}

        <Box mt={2}>
          <Link
            href={`/projects/${project.id}`}
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            { project.title }
          </Link>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            {text}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          {/* <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
          >
            Read more
          </Link> */}
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {postedAt}
          </chakra.span>

          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src={owner.image}
              alt="avatar"
            />
            <Link
              href={`/profile/${owner.id}`}
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
