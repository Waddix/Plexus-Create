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
  Tooltip,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import SearchResults from "./searchResults";
import { useGetAllProfilesQuery, useProjectsQuery } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { Profile } from '../../../server/src/db/entities/Profile'
import { Project } from '../../../server/src/db/entities/Project'

function Search(): JSX.Element {
  // Search query
  const [searchBar, setSearchBar] = useState("");
  const query = useRef("")

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

  // Caret down icon
  const caretDownIcon = (): JSX.Element => {
    return <FontAwesomeIcon icon={faCaretDown} size='2x' />
  }

  // Results of the search
  const [results, setResults] = useState({
    Profiles: null,
    Projects: null,
  });

  const [initialData, setInitialData] = useState({
    Profiles: [],
    Projects: [],
  });

  // Fetch initial content //
  // Get all profiles
  const [profilesResult, refetchProfiles] = useGetAllProfilesQuery();
  const { data: profilesData, fetching: profilesFetching, error: profilesError } = profilesResult;

  useEffect(() => {
    if (!profilesFetching && profilesData && !profilesError) {
      setInitialData(Object.assign(initialData, {
        Profiles: [profilesData.getAllProfiles],
      }))
    }
  }, [profilesData, profilesError, profilesFetching])

  // Get all projects
  const [projectsResult, refetchProjects] = useProjectsQuery();
  const { data: projectsData, fetching: projectsFetching, error: projectsError } = projectsResult;

  useEffect(() => {
    if (!projectsFetching && projectsData && !projectsError) {
      setInitialData(Object.assign(initialData, {
        Projects: [projectsData.projects],
      }))
    }
  }, [projectsData, projectsError, projectsFetching])


  // Filter the results
  const filterResults = (filters: Filters) => {
    let filtered: [[string, Profile | null] | [string, Project | null]];

    interface Filtered {
      Profiles: Profile[] | null,
      Projects: Project[] | null,
    }

    const filterToData: Filtered = {
      Profiles: initialData.Profiles,
      Projects: initialData.Projects,
      // Tags: null,
    }

    for (let filter in filters) {
      if (filters[filter]) {
        filterToData[filter].map((results) => {
          if (!filtered) {
            filtered = [[filter, results]]
          } else {
            filtered.push([filter, results])
          }
        })
      } else if (!filters[filter]) {
        if (!filtered) {
          filtered = [[filter, null]]
        } else {
          filtered.push([filter, null])
        }
      }
    }

    return filtered;
  }

  // Search profile for the query string.
  const searchProfile = (profiles: Profile[] | null, query: string): { profileResults: Profile[] | null, } => {
    interface Output {
      profileResults: Profile[] | null,
    }

    // Output object
    const output: Output = {
      profileResults: null,
    };

    if (!profiles) {
      return output;
    }

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
      return output;
    } else {
      // Otherwise add each unique profile into the results array.
      rawResults.map(result => {
        if (results === undefined && result) {
          results = [result];
        } else if (result && !results.includes(result)) {
          results.push(result);
        }
      })

      output.profileResults = results;

      return output
    }
  }

  const searchProjects = (projects: Project[] | null, query: string): { projectResults: Project[] | null, } => {
    interface Output {
      projectResults: Project[] | null,
    }

    // Output object
    const output: Output = {
      projectResults: null,
    };

    if (!projects) {
      return output;
    }
    // Getting results of the query when trying to match it against the profile name.
    const titleResults = projects.map((project: Project) => {
      // Converting the query to regex expressions
      const targets: (RegExp | null)[] = query.split(' ').map((queryTerm: string) => {
        if (queryTerm === "") {
          return null
        } else {
          const exp = RegExp(`\\b${queryTerm}\\b`, 'i');
          return exp;
        }
      });

      // Title based search is strict. Doing an every check and using each filter on the name.
      const queryResult: boolean = targets.every((targetExp: RegExp | null): boolean => {
        if (targetExp === null) {
          return false;
        } else {
          return targetExp.test(project.title);
        }
      })

      // If the results is true then return the project.
      if (queryResult) {
        return project;
      }
    })

    let results: Project[];

    // If every query returned undefined then return null
    if (titleResults.every(result => result === undefined)) {
      return output;
    } else {
      // Otherwise add each unique project into the results array.
      titleResults.map(result => {
        if (results === undefined && result) {
          results = [result];
        } else if (result && !results.includes(result)) {
          results.push(result);
        }
      })

      output.projectResults = results;

      return output;
    }
  };

  // Handle Search
  const handleSearch = (query: string): void => {
    // Get the filtered results
    const filtered = filterResults(filters);
    interface Results {
      Projects: Project[] | null,
      Profiles: Profile[] | null,
      // Posts
      // Teams:
      // Campaigns
    }

    const searchResults: Results = {
      Projects: null,
      Profiles: null,
    };

    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i][0] === 'Profiles') {
        const profiles = searchProfile(filtered[i][1], query);
        searchResults.Profiles = profiles.profileResults;
      } else if (filtered[i][0] === 'Projects') {
        const projects = searchProjects(filtered[i][1], query);
        searchResults.Projects = projects.projectResults;
      }
    }

    setResults(searchResults);
  }

  const handleFilterChange = (filter: string, bool: boolean): void => {
    const newFilters = filters;

    newFilters[filter] = bool;

    setFilters({ ...newFilters })
    // Reset the state here with the filters that are enabled.
    handleSearch(query.current)
  };

  // Show loading animation and disable input when fetching data
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    if (projectsFetching || projectsFetching) {
      setFetching(true);
    } else {
      setFetching(false);
    }
  }, [profilesFetching, projectsFetching])


  // Disables search if fetching data, empty searchbar, or error with any data fetches
  const [searchDisabled, setSearchDisabled] = useState(true);
  useEffect(() => {
    if ((profilesError || projectsError) && !fetching) {
      setSearchDisabled(true);
      setFetching(false);
    } else {
      setSearchDisabled(false);
    }
  }, [profilesError, projectsError, fetching])

  // Render the checkboxes
  const checkBoxes = (filter: string): JSX.Element => {
    return (
      <Checkbox
        key={filter}
        size="md"
        colorScheme="green"
        defaultIsChecked
        onChange={(e) => {
          handleFilterChange(filter, e.target.checked);
        }}
        isChecked={filters[filter]}
        isDisabled={searchDisabled || fetching}
      >
        {filter}
      </Checkbox>
    )
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
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (searchBar.length > 0) {
                  query.current = searchBar
                  handleSearch(query.current)
                }
              }
            }}
            isDisabled={searchDisabled || fetching}
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
              onClick={() => {
                if (searchBar.length > 0) {
                  query.current = searchBar
                  handleSearch(query.current)
                }
              }}
              isDisabled={searchDisabled}
              isLoading={fetching}
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
