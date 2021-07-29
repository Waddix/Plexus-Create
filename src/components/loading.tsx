import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

const LoadingAnimation = () => {
  return (
    <Box textAlign="center" w="auto" mx="auto" my={6}>
      <Heading mb={4}>Loading</Heading>
      <Box className="loading">
        <Box className="hollowLoader">
          <Box className="largeBox">
            <Box className="smallBox">
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default LoadingAnimation;