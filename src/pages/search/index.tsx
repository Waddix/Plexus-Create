import {
  Input,
  Box,
  InputGroup,
  Button,
  useColorModeValue,
  InputRightElement,
  HStack,
  Checkbox,
  Collapse,
  Tooltip
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import SearchResults from "./searchResults";

export default function Search() {
  // Search query
  const [query, setQuery] = useState("");

  // Toggle filter checkboxes
  const [showFilterSelect, setShowFilterSelect] = useState(false);
  const toggleShowFilter = (): void => {
    setShowFilterSelect(!showFilterSelect);
  }

  // Filters
  const filters = {
    Profiles: true,
    Tags: true,
    Projects: true,
    Campaigns: true,
    Teams: true,
  }

  // Render the checkboxes
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

  // Caret down icon
  const caretDownIcon = (): JSX.Element => {
    return <FontAwesomeIcon icon={faCaretDown} size='2x' />
  }

  // Results of the search
  const [results, setResults] = useState([]);

  // Handle Search
  const handleSearch = (query: string): void => {
    setResults([...results, query])
    setQuery("");
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
            id='search-field'
            bg={useColorModeValue('gray.100', 'gray.900')}
            borderColor={useColorModeValue('orange.200', 'orange.700')}
            type="text"
            placeholder="Connect, Collaborate, Contribute"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          />
          <InputRightElement w="3rem" mr='1rem'>
            <Tooltip
              label="Filters"
              aria-label="Filters button"
              fontSize='md'
              openDelay={400}
            >
              <Button
                display={{ base: 'none', lg: 'inline-flex' }}
                id='filter'
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
            </Tooltip>
            <Button
              id='search-button'
              display={{ base: 'flex', lg: 'none' }}
              h="1.75rem"
              size="sm"
              pl={8}
              pr={8}
              mr='6rem'
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
              onClick={() => handleSearch(query)}
            >
              Search
            </Button>
          </InputRightElement>
          <Tooltip
            label="Filters"
            aria-label="Filters button"
            fontSize='md'
            openDelay={100}
          >
            <Button
              display={{ base: 'inline-flex', lg: 'none' }}
              id="filters"
              size="md"
              px={2}
              py={2}
              ml='0.5rem'
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
              onClick={() => toggleShowFilter()}
              variant="ghost"
              zIndex='10'
            >
              {caretDownIcon()}
            </Button>
          </Tooltip>
        </InputGroup>
        <Collapse
          in={showFilterSelect}
          animateOpacity
        >
          <HStack
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
      <SearchResults results={results} />
    </Fragment>
  )
}