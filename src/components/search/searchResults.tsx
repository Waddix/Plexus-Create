import { Box, VStack, Heading } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Project } from "../../generated/graphql";
// import { ProjectCard } from "../projects/ProjectCard";
// import { UserCard } from "../UserCard"
import Profile from "../../models/profile";
import LoadingAnimation from "../loading";
import DTProjectCard from "../cards/desktop/DTProjectCard";
import MBProjectCard from "../cards/mobile/MBProjectCard";
import DTProfileCard from "../cards/desktop/DTProfileCard";
import MBProfileCard from "../cards/mobile/MBProfileCard";
import { AppProps } from "next/app";

interface Results {
  Profiles: Profile[] | null,
  Projects: Project[] | null,
}

interface Props {
  results: Results,
  fetching: boolean
  query: string,
  pageProps: AppProps
}

function SearchResults({ results, fetching, query, pageProps }: Props): JSX.Element {
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
        mb={4}
      >
        {Object.values(results).some(results => results !== null) &&
          Object.keys(results).map(resultKey => {
            if (resultKey === 'Projects') {
              const projects = results.Projects;
              if (projects) {
                return (
                  <Fragment>
                    <VStack
                      d={{ base: "flex", md: "none" }}
                      m="auto"
                      w="100%"
                    >
                      {projects.map((p) => (
                        <MBProjectCard
                          key={p.title.replace(" ", "-").toLowerCase()}
                          project={p}
                        />
                      ))}
                    </VStack>
                    <VStack
                      spacing={6}
                      mb={6}
                      d={{ base: "none", md: "flex" }}
                    >
                      {projects.map((p) => (
                        <DTProjectCard
                          key={p.title.replace(" ", "-").toLowerCase()}
                          project={p}
                        />
                      ))}
                    </VStack>
                  </Fragment>
                )
                // return projects.map((project: Project) =>
                //   <ProjectCard
                //     key={project.id + '-' + project.title.replace(' ', '-')}
                //     title={project.title}
                //     description={project.description}
                //     id={project.id}
                //     createdAt={project.createdAt}
                //     updatedAt={project.updatedAt}
                //     username={project.owner.username}
                //     image={project.owner.image}
                //   />
                // )
              }
            } if (resultKey === "Profiles") {
              const profiles = results.Profiles;
              if (profiles) {
                return (
                  <Fragment>
                    <VStack
                      d={{ base: "flex", md: "none" }}
                      m="auto"
                      w="100%"
                    >
                      {profiles.map((p) => (
                        <MBProfileCard
                          key={p.title.replace(" ", "-").toLowerCase()}
                          profile={p}
                          {...pageProps}
                        />
                      ))}
                    </VStack>
                    <VStack
                      spacing={6}
                      mb={6}
                      d={{ base: "none", md: "flex" }}
                    >
                      {profiles.map((p) => (
                        <DTProfileCard
                          key={p.title.replace(" ", "-").toLowerCase()}
                          profile={p}
                          {...pageProps}
                        />
                      ))}
                    </VStack>
                  </Fragment>
                )
                // return profiles.map((profile: Profile) => {
                //   if (profile.name) {
                //     return (
                //       <UserCard
                //         key={profile.id + '-' + profile.username}
                //         profile={profile}
                //         currId={profile.id}
                //       />
                //     )
                //   }
                // })
              }
            }
          })
        }
        {fetching &&
          (
            <Box m='auto'>
              <LoadingAnimation />
            </Box>
          )
        }
        {(Object.values(results).every(results => results === null) && query) &&
          (
            <Box m='auto'>
              <Heading>
                No results found for {query}
              </Heading>
            </Box>
          )
        }
        {(Object.values(results).every(results => results === null) && !query && !fetching) &&
          (
            <Box m='auto'>
              <Heading>
                Find the next big thing
              </Heading>
            </Box>
          )
        }
      </VStack>
    </Box>
  )
}

export default SearchResults;
