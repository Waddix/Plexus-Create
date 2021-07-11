import { Box, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import { Project } from "../../../server/src/db/entities/Project";
import { ProjectCard } from "../projects/ProjectCard";
import { UserCard } from "../UserCard"
import Profile from "../../models/profile";

interface Results {
  Profiles: Profile[] | null,
  Projects: Project[] | null,
}

interface Props {
  results: Results,
  fetching: boolean
  query: string,
}

function SearchResults({ results, fetching, query }: Props): JSX.Element {
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
        {Object.values(results).some(results => results !== null) &&
          Object.keys(results).map(resultKey => {
            if (resultKey === 'Projects') {
              const projects = results.Projects;
              if (projects) {
                return projects.map((project: Project) =>
                  <ProjectCard
                    key={project.id + '-' + project.title.replace(' ', '-')}
                    title={project.title}
                    description={project.description}
                    id={project.id}
                    createdAt={project.createdAt}
                    updatedAt={project.updatedAt}
                    username={project.owner.username}
                    image={project.owner.image}
                  />
                )
              }
            } if (resultKey === "Profiles") {
              const profiles = results.Profiles;
              if (profiles) {
                return profiles.map((profile: Profile) => {
                  if (profile.name) {
                    return (
                      <UserCard
                        key={profile.id + '-' + profile.username}
                        profile={profile}
                        currId={profile.id}
                      />
                    )
                  }
                })
              }
            }
          })
        }
        {fetching &&
          (
            <Box m='auto'>
              <Heading>
                Fetching data, please wait.
              </Heading>
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
