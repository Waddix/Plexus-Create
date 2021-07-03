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

  // All expected types: 'Profiles' | 'Tags' | 'Projects' | 'Campaigns' | 'Teams' | 'Posts'
  // Render the checkboxes
  const checkBoxes = (filter: 'Profiles' | 'Projects'): JSX.Element => {
    return (
      <Checkbox
        key={filter}
        size="md"
        colorScheme="green"
        defaultIsChecked
        onChange={(e) => {
          const newValue = e.target.checked
          const newFilters = filters

          newFilters[filter] = newValue
          setFilters({ ...newFilters })
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
    Profiles: [],
    Projects: [],
  });

  // Fetch initial content //
  // Get all profiles
  const [profilesResult, refetchProfiles] = useGetAllProfilesQuery();
  const { data: profilesData, fetching: profilesFetching, error: profilesError } = profilesResult;

  useEffect(() => {
    if (!profilesFetching && profilesData && !profilesError) {
      setResults(Object.assign(results, {
        profiles: [profilesData.getAllProfiles],
      }))
    }
  }, [profilesData, profilesError, profilesFetching, results])

  // Get all projects
  const [projectsResult, refetchProjects] = useProjectsQuery();
  const { data: projectsData, fetching: projectsFetching, error: projectsError } = projectsResult;

  useEffect(() => {
    if (!projectsFetching && projectsData && !projectsError) {
      setResults(Object.assign(results, {
        projects: [projectsData.projects],
      }))
    }
  }, [projectsData, projectsError, projectsFetching, results])


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
        // console.info(filterToResults[filter]);
        filterToResults[filter].map(results => {
          if (!filtered) {
            filtered = [[filter, results]]
          } else {
            filtered.push([filter, results])
          }
        })
      }
    }

    return filtered;
  }

  // Search profile for the query string.
  const searchProfile = (profiles: Profile[], query: string): ({ profileResults: Profile[] } | null) => {

    // Getting results of the query when trying to match it against the profile name.
    const nameResults: (Profile | undefined)[] = profiles.map((profile: Profile): Profile | undefined => {
      // Converting the query to regex expressions
      const targets: (RegExp | null)[] = query.split(' ').map((queryTerm: string) => {
        if (queryTerm === "") {
          return null
        } else {
          const exp = RegExp(`\\b${queryTerm}\\b`, 'i');
          return exp;
        }
      });

      // Name based search is strict. Doing an every check and using each filter on the name.
      const queryResult: boolean = targets.every((targetExp: RegExp | null): boolean => {
        if (targetExp === null) {
          return false;
        } else {
          return targetExp.test(profile.name);
        }
      })

      // If the results is true then return the profile.
      if (queryResult) {
        return profile;
      }
    })

    // Getting results of the query when trying to match it against the profile username.
    const userNameResults: (Profile | undefined)[] = profiles.map((profile: Profile): Profile | undefined => {
      // Converting the query to regex expressions
      const targets: (RegExp | null)[] = query.split(' ').map((queryTerm: string) => {
        if (queryTerm === "") {
          return null
        } else {
          const exp = RegExp(`(${queryTerm})`, 'i');
          return exp;
        }
      });

      // Username based search is lax. Doing a some check and using each filter on the username.
      const queryResult: boolean = targets.some((targetExp: RegExp | null): boolean => {
        if (targetExp == null) {
          return false
        } else {
          return targetExp.test(profile.username);
        }
      })

      // If the results is true then return the profile.
      if (queryResult) {
        return profile;
      }
    })

    // Concatenating both results
    const rawResults: (Profile | undefined)[] = nameResults.concat(userNameResults);

    // Unique results
    let results: Profile[];

    // If every query returned undefined then return null
    if (rawResults.every(result => result === undefined)) {
      return null;
    } else {
      // Otherwise add each unique profile into the results array.
      rawResults.map(result => {
        if (results === undefined && result) {
          results = [result];
        } else if (result && !results.includes(result)) {
          results.push(result);
        }
      })

      // Output object
      const output = {
        profileResults: results,
      };

      return output;
    }
  }

  // Handle Search
  const handleSearch = async (query: string): Promise<void> => {
    // Refetch data
    await refetchProfiles();
    await refetchProjects();

    // Get the filtered results
    const filtered = filterResults(filters);

    interface Results {
      Projects: Project[] | null,
      Profiles: Profile[] | null,
      // Posts
      // Teams:
      // Campaigns
    }

    const results: Results = {
      Projects: null,
      Profiles: null,
    };

    for (let i = 0; i < filtered.length; i++) {
      // console.warn(filtered[i][0]);
      if (filtered[i][0] === 'Profiles' && filtered[i][0].length > 0) {
        const profiles = searchProfile(filtered[i][1], query);

        if (profiles) {
          results.Profiles = profiles.profileResults;
        }
      } else if (filtered[i][0] === 'Projects' && filtered[i][0].length > 0) {
        const projects = searchProjects(filtered[i][1], query);

        if (projects) {
          results.Projects = projects;
        }
      }
    }

    // setQuery("");
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
