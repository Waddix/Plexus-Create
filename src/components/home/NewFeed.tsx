import {
  Box,
  Heading
} from "@chakra-ui/layout";
import React, { useContext } from "react";
import DTProfileCard from "../cards/desktop/DTProfileCard";
import { UserContext } from "../../context/userContext";
import { VStack } from "@chakra-ui/react";

const NewFeed = (): JSX.Element => {
  const profile = useContext(UserContext);
  const { userProfile } = profile;
  return (
    <Box
      w={["100%", "100%", "90%", "80%"]}
      mx="auto"
      mt={6}
      mb="auto"
      textAlign="center"
    >
      <VStack
        d={{ base: "flex", md: "none" }}
        m="auto"
        w="100%"
      >
        <Heading>Mobile View!</Heading>
      </VStack>
      <VStack
        d={{ base: "none", md: "flex" }}
        m="auto"
        w="100%"
      >
        <Heading>{"Tablet & Desktop View!"}</Heading>
        <DTProfileCard profile={userProfile} />
      </VStack>
      <VStack
        d={["none", "none", "none", "none", "none", "none", "flex"]}
        m="auto"
        w="100%"
      >
        <Heading>UltraWide View!</Heading>
      </VStack>
    </Box>
  )
};

export default NewFeed;