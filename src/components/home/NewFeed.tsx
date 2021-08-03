import {
  Box,
  Heading
} from "@chakra-ui/layout";
import React from "react";

const NewFeed = (): JSX.Element => {

  return (
    <Box
      w={["100%", "100%", "90%", "80%"]}
      mx="auto"
      mt={6}
      mb="auto"
      textAlign="center"
    >
      <Box
        d={{ base: "flex", md: "none" }}
        m="auto"
        w="100%"
      >
        <Heading>Mobile View!</Heading>
      </Box>
      <Box
        d={{ base: "none", md: "flex" }}
        m="auto"
        w="100%"
      >
        <Heading>{"Tablet & Desktop View!"}</Heading>
      </Box>
      <Box
        d={["none", "none", "none", "none", "none", "none", "flex"]}
        m="auto"
        w="100%"
      >
        <Heading>UltraWide View!</Heading>
      </Box>
    </Box>
  )
};

export default NewFeed;