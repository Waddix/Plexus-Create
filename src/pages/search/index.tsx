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
import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import SearchResults from "./searchResults";
import { useGetAllProfilesQuery, useProjectsQuery } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { Profile } from '../../../server/src/db/entities/Profile'
import { Project } from '../../../server/src/db/entities/Project'

function Search(): JSX.Element {
  // Search query
  const [query, setQuery] = useState("");

  // Toggle filter checkboxes
  const [showFilterSelect, setShowFilterSelect] = useState(false);
  const toggleShowFilter = (): void => {
    setShowFilterSelect(!showFilterSelect);
  }


  const [filters, setFilters] = useState({
    Profiles: true,
    // Tags: true,
    Projects: true,
    // Campaigns: true,
    // Teams: true,
  })


  // All expected types: 'Profiles' | 'Tags' | 'Projects' | 'Campaigns' | 'Teams'
  // Render the checkboxes
  const checkBoxes = (filter: 'Profiles' | 'Projects'): JSX.Element => {
    return (
      <Checkbox
        key={filter}
        size="md"
        colorScheme="green"
        defaultIsChecked
        onChange={() => {
          const newFilters = filters

          newFilters[filter] = !filters[filter]
          setFilters(newFilters)
        }}
        isChecked={filters[filter]}
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
  const [results, setResults] = useState({
    profiles: [],
    projects: [],
  });

  // Get all profile
  const [profilesResult, refetchProfiles] = useGetAllProfilesQuery();
  const { data: profilesData, fetching: profilesFetching, error: profilesError } = profilesResult;

  useEffect(() => {
    if (!profilesFetching && profilesData && !profilesError) {
      setResults(Object.assign(results, {
        profiles: [profilesData.getAllProfiles],
      }))
    }
  }, [profilesData, profilesError, profilesFetching])

  // Get all projects
  const [projectsResult, refetchProjects] = useProjectsQuery();
  const { data: projectsData, fetching: projectsFetching, error: projectsError } = projectsResult;

  useEffect(() => {
    if (!projectsFetching && projectsData && !projectsError) {
      setResults(Object.assign(results, {
        projects: [projectsData.projects],
      }))
    }
  }, [projectsData, projectsError, projectsFetching])


  // Filter the results
  const filterResults = (filters: Filters) => {
    let filtered: [[string, Profile] | [string, Project]];

    const filterToResults = {
      Profiles: results.profiles,
      Projects: results.projects,
      // Tags: null,
    }

    for (let filter in filters) {
      if (filters[filter]) {
        console.info(filterToResults[filter]);
        // filterToResults[filter].map(results => {
        //   if (!filtered) {
        //     filtered = [[filter, results]]
        //   } else {
        //     filtered.push([filter, results])
        //   }
        // })
      }
    }

    // return filtered;
  }

  // Handle Search
  const handleSearch = async (query: string): void => {
    // Refetch data
    await refetchProfiles();
    await refetchProjects();

    // Get the filtered results
    const filtered = filterResults(filters);

    console.log(filtered)

    // const results = [];

    // const searchProfile = (profile, query): void => {
    //   const targets = query.split(" ");

    //   const nameResults = targets.map(target => name.split(" ").includes(target));

    //   console.log('Name Results', nameResults);
    // }

    // for (let i = 0; i < filtered.length; i++) {
    //   if (filtered[i][0] === 'profile') {
    //     searchProfile(filtered[i][1], query)
    //   }
    // }
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

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(Search);
