/* eslint-disable @typescript-eslint/ban-types */
import { Wrapper } from "../components/forms/Wrapper";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import router from "next/dist/client/router";
import { InputField } from "../components/forms/InputField";
import { TextArea } from "../components/forms/TextArea";
import { Box, Button } from "@chakra-ui/react";
import { useCreateProjectMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";

import { UserContext } from '../context/userContext';

const CreateProject: React.FC<{}> = ({ }) => {
  const [, createProject] = useCreateProjectMutation();
  const { userProfile } = useContext(UserContext);

  console.log(parseInt(userProfile.id))

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async (values, { setErrors }) => {
          // test userId
          // need to add error handling in resolver
          // this isnt effective
          const response = await createProject({ input: values, ownerId: parseInt(userProfile.id) });
          if (response.error) {
            setErrors({ title: 'error in title', description: 'error in description' })
          } else if (response.data) {
            console.log(response.data)
            router.push("/projects")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Project Title" label="Title" />
            <Box mt={4}>
              <TextArea
                name="description"
                placeholder="Project Description"
                label="Description"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="orange"
              isLoading={isSubmitting}
            >
              Create Project
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(CreateProject);