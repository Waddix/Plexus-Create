/* eslint-disable @typescript-eslint/ban-types */
import { Wrapper } from "../components/Wrapper";
import { Form, Formik } from "formik";
import React from "react";
import router from "next/dist/client/router";
import { InputField } from "../components/InputField";
import { TextArea } from "../components/TextArea";
import { Box, Button } from "@chakra-ui/react";

 const createProject: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
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

export default createProject;