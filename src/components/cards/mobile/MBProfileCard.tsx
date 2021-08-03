import { Box } from "@chakra-ui/react";
import React from "react";

const MBProfileCard = ({ profile }): JSX.Element => {
  const { name, username, image, title, email, bio, id } = profile;

  return (
    <Box
      w="100%"
      h="100%"
      m="auto"
      border="2px solid blue"
    >
    </Box>
  )
};

export default MBProfileCard;