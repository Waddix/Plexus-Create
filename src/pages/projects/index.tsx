import { Center, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react"
import { ProjectCard } from "../../components/ProjectCard";
import { useProjectsQuery } from "../../generated/graphql";

const ProjectView: React.FC<unknown> = (): JSX.Element => {
  const [{data}] = useProjectsQuery();
  // onClick to push to projects/projectID
  return (
    <Flex m={31}>
    { data?.projects.map((p) => {
      return <ProjectCard key={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt}> </ProjectCard>
    })}
  </Flex>
  )
};

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(ProjectView);