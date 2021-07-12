import {
  Box,
  Flex,
  Link,
  HStack,
  Image,
  Text,
  Button,
  Collapse,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import React from "react";
import { useState } from "react";
import { useProjectPositionsQuery } from "../../generated/graphql";
import { PositionTagsByID } from "./PositionTags";
import { SiMinutemailer } from "react-icons/si";
interface PositionCardProps {
  projectId: number;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string | undefined;
  image?: string | undefined;
  type?: string;
  email?: string;
}
export const PositionCard: React.FC<PositionCardProps> = ({
  description,
  projectId,
  username,
  image,
  email
}) => {
  const [{ data }] = useProjectPositionsQuery({
    variables: {
      projectId,
    },
  });

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const position = data?.projectPositions[0];
  return (
    <Box>
      <Heading as="h4" fontSize="md">
        Open Positions
      </Heading>
      <Collapse startingHeight={0} in={show}>
        {description}
        <Flex justifyContent="space-between" alignItems="center">
          <PositionTagsByID id={position?.id}></PositionTagsByID>
        </Flex>
        <Box mt={2}>
          <Link
            fontSize="2xl"
            color={"white"}
            fontWeight="700"
            _hover={{
              color: "gray.200",
              textDecor: "underline",
            }}
          >
            {position?.title}
          </Link>
          <HStack>
            <Text>{position?.type}</Text>
          </HStack>
          <chakra.p mt={2} color={"gray.300"}>
            {position?.description}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <HStack>
            <Flex alignItems="center">
              <Image
                mx={4}
                w={10}
                h={10}
                rounded="full"
                fit="cover"
                display={{ base: "none", sm: "block" }}
                src={image}
                alt="Project Owner Avatar"
              />
              <Link color={"gray.200"} fontWeight="700" cursor="pointer">
                {username}
              </Link>
            </Flex>
            <Link color={"brand.400"} _hover={{ textDecor: "underline" }}>
              <Spacer>
                <Box>
                <a href={`mailto:lalib.worldwide@gmail.com`}>
                  <SiMinutemailer></SiMinutemailer>
                </a>
                </Box>
              </Spacer>
            </Link>
          </HStack>
        </Flex>
      </Collapse>
      <Spacer>
        <Button size="sm" onClick={handleToggle} mt="1rem" variant="link" p="0">
          Show {show ? "Less" : "More"}
        </Button>
      </Spacer>
    </Box>
  );
};
