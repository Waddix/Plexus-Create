/* eslint-disable react-hooks/exhaustive-deps */
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
  Icon,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import SearchResults from "../../components/search/searchResults";
import {
  useGetAllProfilesQuery,
  useProjectsQuery,
} from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { Profile, Project } from "../../generated/graphql";
import { AppProps } from "next/app";

function Search(pageProps: AppProps): JSX.Element {
  // Search query
  const [searchBar, setSearchBar] = useState("");
  const query = useRef("");

  // Toggle filter checkboxes
  const [showFilterSelect, setShowFilterSelect] = useState(false);
  const toggleShowFilter = (): void => {
    setShowFilterSelect(!showFilterSelect);
  };

  interface Filters {
    Profiles: boolean;
    // Tags: true,
    Projects: boolean;
    // Campaigns: true,
    // Teams: true,
  }

  const [filters, setFilters] = useState<Filters>({
    Profiles: true,
    // Tags: true,
    Projects: true,
    // Campaigns: true,
    // Teams: true,
  });

  interface Results {
    Profiles: Profile[] | null;
    Projects: Project[] | null;
  }

  // Results of the search
  const [results, setResults] = useState<Results>({
    Profiles: null,
    Projects: null,
  });

  const [initialData, setInitialData] = useState<Results>({
    Profiles: null,
    Projects: null,
  });

  // Fetch initial content //
  // Get all profiles
  const [profilesResult] = useGetAllProfilesQuery();
  const {
    data: profilesData,
    fetching: profilesFetching,
    error: profilesError,
  } = profilesResult;

  useEffect(() => {
    if (!profilesFetching && profilesData && !profilesError) {
      setInitialData(
        Object.assign(initialData, {
          Profiles: [profilesData.getAllProfiles],
        })
      );
    }
  }, [profilesData, profilesError, profilesFetching]);

  // Get all projects
  const [projectsResult] = useProjectsQuery();
  const {
    data: projectsData,
    fetching: projectsFetching,
    error: projectsError,
  } = projectsResult;

  useEffect(() => {
    if (!projectsFetching && projectsData && !projectsError) {
      setInitialData(
        Object.assign(initialData, {
          Projects: [projectsData.projects],
        })
      );
    }
  }, [projectsData, projectsError, projectsFetching]);

  interface Filtered {
    Profiles: Profile[] | null;
    Projects: Project[] | null;
  }

  // Filter the results
  const filterResults = (filters: Filters): Filtered => {
    const filtered: Filtered = {
      Profiles: null,
      Projects: null,
    };

    const filterToData: Filtered = {
      Profiles: initialData.Profiles,
      Projects: initialData.Projects,
      // Tags: null,
    };

    for (let filter in filters) {
      if (filters[filter]) {
        filterToData[filter].map((results) => {
          if (results.length) {
            filtered[filter] = results;
          }
        });
      }
    }

    return filtered;
  };

  // Search profile for the query string.
  const searchProfile = (
    profiles: Profile[] | null,
    query: string
  ): { profileResults: Profile[] | null } => {
    interface Output {
      profileResults: Profile[] | null;
    }

    // Output object
    const output: Output = {
      profileResults: null,
    };

    if (!profiles) {
      return output;
    }

    // Getting results of the query when trying to match it against the profile name.
    const nameResults: (Profile | undefined)[] = profiles.map(
      (profile: Profile): Profile | undefined => {
        // Converting the query to regex expressions
        const targets: (RegExp | null)[] = query
          .split(" ")
          .map((queryTerm: string) => {
            if (queryTerm === "") {
              return null;
            } else {
              const exp = RegExp(`\\b${queryTerm}\\b`, "i");
              return exp;
            }
          });

        // Name based search is strict. Doing an every check and using each filter on the name.
        const queryResult: boolean = targets.every(
          (targetExp: RegExp | null): boolean => {
            if (targetExp === null) {
              return false;
            } else {
              return targetExp.test(profile.name);
            }
          }
        );

        // If the results is true then return the profile.
        if (queryResult) {
          return profile;
        }
      }
    );

    // Getting results of the query when trying to match it against the profile username.
    const userNameResults: (Profile | undefined)[] = profiles.map(
      (profile: Profile): Profile | undefined => {
        // Converting the query to regex expressions
        const targets: (RegExp | null)[] = query
          .split(" ")
          .map((queryTerm: string) => {
            if (queryTerm === "") {
              return null;
            } else {
              const exp = RegExp(`(${queryTerm})`, "i");
              return exp;
            }
          });

        // Username based search is lax. Doing a some check and using each filter on the username.
        const queryResult: boolean = targets.some(
          (targetExp: RegExp | null): boolean => {
            if (targetExp == null) {
              return false;
            } else {
              return targetExp.test(profile.username);
            }
          }
        );

        // If the results is true then return the profile.
        if (queryResult) {
          return profile;
        }
      }
    );

    // Concatenating both results
    const rawResults: (Profile | undefined)[] =
      nameResults.concat(userNameResults);

    // Unique results
    let results: Profile[];

    // If every query returned undefined then return null
    if (rawResults.every((result) => result === undefined)) {
      return output;
    } else {
      // Otherwise add each unique profile into the results array.
      rawResults.map((result) => {
        if (results === undefined && result) {
          results = [result];
        } else if (result && !results.includes(result)) {
          results.push(result);
        }
      });

      output.profileResults = results;

      return output;
    }
  };

  const searchProjects = (
    projects: Project[] | null,
    query: string
  ): { projectResults: Project[] | null } => {
    interface Output {
      projectResults: Project[] | null;
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
      const targets: (RegExp | null)[] = query
        .split(" ")
        .map((queryTerm: string) => {
          if (queryTerm === "") {
            return null;
          } else {
            const exp = RegExp(queryTerm, "i");
            return exp;
          }
        });

      // Title based search is strict. Doing an every check and using each filter on the name.
      const queryResult: boolean = targets.every(
        (targetExp: RegExp | null): boolean => {
          if (targetExp === null) {
            return false;
          } else {
            return targetExp.test(project.title.toLowerCase());
          }
        }
      );

      // If the results is true then return the project.
      if (queryResult) {
        return project;
      }
    });

    let results: Project[];

    // If every query returned undefined then return null
    if (titleResults.every((result) => result === undefined)) {
      return output;
    } else {
      // Otherwise add each unique project into the results array.
      titleResults.map((result) => {
        if (results === undefined && result) {
          results = [result];
        } else if (result && !results.includes(result)) {
          results.push(result);
        }
      });

      output.projectResults = results;

      return output;
    }
  };

  // Handle Search
  const handleSearch = (query: string): void => {
    // Get the filtered results
    const filtered = filterResults(filters);

    const searchResults: Results = {
      Projects: null,
      Profiles: null,
    };

    for (let filter in filtered) {
      if (filtered[filter]) {
        const results = filtered[filter];
        if (filter === "Projects") {
          const projects = searchProjects(results, query);
          searchResults.Projects = projects.projectResults;
        } else if (filter === "Profiles") {
          const profiles = searchProfile(results, query);
          searchResults.Profiles = profiles.profileResults;
        }
      }
    }

    setResults(searchResults);
  };

  const handleFilterChange = (filter: string, bool: boolean): void => {
    const newFilters = filters;

    newFilters[filter] = bool;

    setFilters({ ...newFilters });
    // Reset the state here with the filters that are enabled.
    handleSearch(query.current);
  };

  // Show loading animation and disable input when fetching data
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    if (projectsFetching || projectsFetching) {
      setFetching(true);
    } else {
      setFetching(false);
    }
  }, [profilesFetching, projectsFetching]);

  // Disables search if fetching data, empty searchbar, or error with any data fetches
  const [searchDisabled, setSearchDisabled] = useState(true);
  useEffect(() => {
    if ((profilesError || projectsError) && !fetching) {
      setSearchDisabled(true);
      setFetching(false);
    } else {
      setSearchDisabled(false);
    }
  }, [profilesError, projectsError, fetching]);

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
    );
  };

  return (
    <Fragment>
      <Box
        mt={["0.5rem", "0.5rem", "0.5rem", "2rem"]}
        w={["auto", "auto", "auto", "90vw"]}
        ml={["1rem", "1rem", "1rem", "auto"]}
        mr={["1rem", "1rem", "1rem", "auto"]}
      >
        <InputGroup>
          <Input
            id="search-field"
            bg={useColorModeValue("gray.100", "gray.900")}
            borderColor={useColorModeValue("orange.200", "orange.700")}
            type="text"
            placeholder="Connect, Collaborate, Contribute"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (searchBar.length > 0) {
                  query.current = searchBar;
                  handleSearch(query.current);
                }
              }
            }}
            isDisabled={searchDisabled || fetching}
          />
          <InputRightElement w="3rem" mr="1rem">
            <Tooltip
              label="Filters"
              aria-label="Filters button"
              fontSize="md"
              openDelay={400}
            >
              <Button
                display={{ base: "none", lg: "inline-flex" }}
                id="filter"
                h="1.75rem"
                size="sm"
                px={1}
                mr={-8}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("orange.200", "orange.700"),
                }}
                onClick={() => toggleShowFilter()}
                variant="ghost"
                fontSize={"1.5rem"}
              >
                <Icon as={FaCaretDown} />
              </Button>
            </Tooltip>
            <Button
              id="search-button"
              display={{ base: "flex", lg: "none" }}
              h="1.75rem"
              size="sm"
              pl={8}
              pr={8}
              mr="6rem"
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("orange.200", "orange.700"),
              }}
              onClick={() => {
                if (searchBar.length > 0) {
                  query.current = searchBar;
                  handleSearch(query.current);
                }
              }}
              isDisabled={searchDisabled || searchBar.length === 0}
              isLoading={fetching}
            >
              Search
            </Button>
          </InputRightElement>
          <Tooltip
            label="Filters"
            aria-label="Filters button"
            fontSize="md"
            openDelay={100}
          >
            <Button
              display={{ base: "inline-flex", lg: "none" }}
              id="filters"
              size="md"
              px={1}
              ml="0.5rem"
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("orange.200", "orange.700"),
              }}
              onClick={() => toggleShowFilter()}
              variant="ghost"
              zIndex="10"
              fontSize="1.5rem"
            >
              <Icon as={FaCaretDown} />
            </Button>
          </Tooltip>
        </InputGroup>
        <Collapse in={showFilterSelect} animateOpacity>
          <HStack
            justifyContent={["center", "center", "center", "center"]}
            mt={2}
            mr={5}
            spacing={8}
            direction="row"
          >
            {Object.keys(filters).map((filter) => {
              return checkBoxes(filter);
            })}
          </HStack>
        </Collapse>
      </Box>
      <SearchResults
        query={query.current}
        fetching={fetching}
        results={results}
        {...pageProps}
      />
    </Fragment>
  );
}

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(Search);
