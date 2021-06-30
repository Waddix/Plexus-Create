import { Input, Box, InputGroup, Button, useColorModeValue } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <Fragment>
      <Box
        mt={['0.5rem', '0.5rem', '0.5rem', '2rem']}
        w={['auto', 'auto', 'auto', '90vw']}
        ml={['1rem', '1rem', '1rem', 'auto']}
        mr='auto'
      >
        <InputGroup>
          <Input
            type="text"
            placeholder="Connect, Collaborate, Contribute"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && alert('search triggered!')}
          />
          <Button
            display={{ base: 'flex', lg: 'none' }}
            ml='1rem'
            mr='1rem'
            rounded={'md'}
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('orange.200', 'orange.700'),
            }}
            onClick={() => alert('search triggered!')}
            >
            Search
          </Button>
        </InputGroup>
      </Box>
    </Fragment>
  )
}