import { Box, VStack } from "@chakra-ui/react";
import React from "react";

export default function SearchResults({ results }): JSX.Element {
  return (
    <Box
      mt={['1rem', '1em', '1rem', '2rem']}
      w={['auto', 'auto', 'auto', '90vw']}
      mx={['2rem', '2rem', '2rem', 'auto']}
    >
      <VStack
        spacing={4}
        align="stretch"
        mx={['0', '0', '0', '2rem']}
      >
        {results.map(result => {
          return (
            <Box
              key={result}
            >
              {result}
            </Box>
          )
        })}
      </VStack>
    </Box>
  )
}