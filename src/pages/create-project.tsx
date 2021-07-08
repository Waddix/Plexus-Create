import { Wrapper } from "../components/forms/Wrapper";
import React from "react";
import { withUrqlClient } from "next-urql";
import dynamic from 'next/dynamic'

const ProjectForm = dynamic(() => import('../components/projects/CreateProjectForm'))

const CreateProject: React.FC<unknown> = ({ }) => {
  return (
    <Wrapper variant="regular">
      <ProjectForm></ProjectForm>
    </Wrapper>

  );
};

export default withUrqlClient(() => ({
  url: 'http://localhost:8080/graphql',
}))(CreateProject);