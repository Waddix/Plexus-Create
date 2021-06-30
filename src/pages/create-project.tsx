/* eslint-disable @typescript-eslint/ban-types */
import { Wrapper } from "../components/forms/Wrapper";
import React from "react";
import { withUrqlClient } from "next-urql";
import dynamic from 'next/dynamic'

const ProjectForm = dynamic(() => import('../components/projects/CreateProjectForm'))

const CreateProject: React.FC<{}> = ({ }) => {
  return (
    <Wrapper variant="regular"> 
      <ProjectForm></ProjectForm>
     </Wrapper>
     
  );
};

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(CreateProject);