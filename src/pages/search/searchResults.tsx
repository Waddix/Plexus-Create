import { Box, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import { Project } from "../../../server/src/db/entities/Project";
import { ProjectCard } from "../../components/projects/ProjectCard";

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
        {Object.values(results).some(results => results !== null) ?
          Object.keys(results).map(resultKey => {
            if (resultKey === 'Projects') {
              const projects = results.Projects
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
          })
          :
          <Box m='auto'>
            <Heading>
              Find the next big thing.
            </Heading>
          </Box>
        }
      </VStack>
    </Box>
  )
}