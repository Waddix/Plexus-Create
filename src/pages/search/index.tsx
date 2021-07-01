import {
  Input,
  Box,
  InputGroup,
  Button,
  useColorModeValue,
  InputRightElement,
  HStack,
  Flex,
  Checkbox,
  Collapse
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
  const [query, setQuery] = useState("");

  const [showFilterSelect, setShowFilterSelect] = useState(false);

  const toggleShowFilter = (): void => {
    setShowFilterSelect(!showFilterSelect);
  }

  const filters = {
    Profiles: true,
    Tags: true,
    Projects: true,
    Campaigns: true,
    Teams: true,
  }

  const checkBoxes = (filter: 'Profiles' | 'Tags' | 'Projects' | 'Campaigns' | 'Teams'): JSX.Element => {
    return (
      <Checkbox
        key={filter}
        size="md"
        colorScheme="green"
        defaultIsChecked
        onChange={() => filters[filter] = !filters[filter]}
      >
        {filter}
      </Checkbox>
    )
  }

  const caretDownIcon = (): JSX.Element => {
    return <FontAwesomeIcon icon={faCaretDown} size='2x' />
  }

  return (
    <Fragment>
      <Box
        mt={['0.5rem', '0.5rem', '0.5rem', '2rem']}
        w={['auto', 'auto', 'auto', '90vw']}
        ml={['1rem', '1rem', '1rem', 'auto']}
        mr={['1rem', '1rem', '1rem', 'auto']}
      >
        <InputGroup>
          <Input
            bg={useColorModeValue('gray.100', 'gray.900')}
            borderColor={useColorModeValue('orange.200', 'orange.700')}
            type="text"
            placeholder="Connect, Collaborate, Contribute"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && alert('search triggered!')}
          />
          <InputRightElement w="3rem" mr='1rem'>
            <Button
              display={{ base: 'none', lg: 'flex' }}
              h="1.75rem"
              size="sm"
              pl={2}
              pr={2}
              mr={-8}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
              onClick={() => toggleShowFilter()}
              variant="ghost"
            >
              {caretDownIcon()}
            </Button>
            <Button
              display={{ base: 'flex', lg: 'none' }}
              h="1.75rem"
              size="sm"
              pl={7}
              pr={7}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
              onClick={() => toggleShowFilter()}
              variant="ghost"
            >
              Filters
            </Button>
            <Button
              display={{ base: 'flex', lg: 'none' }}
              h="1.75rem"
              size="sm"
              pl={8}
              pr={8}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
              onClick={() => alert('search triggered!')}
            >
              {Search}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Collapse
          in={showFilterSelect}
          animateOpacity
        >
          <HStack
            // display={{ base: 'none', lg: 'flex' }}
            justifyContent={['center', 'center', 'center', 'end']}
            mt={2}
            mr={5}
            spacing={8}
            direction="row"
          >
            {Object.keys(filters).map(filter => {
              return checkBoxes(filter)
            })}
          </HStack>
        </Collapse>
      </Box>
    </Fragment>
  )
}