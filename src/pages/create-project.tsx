/* eslint-disable @typescript-eslint/ban-types */
import { Wrapper } from "../components/forms/Wrapper";
import { Form, Formik } from "formik";
import React from "react";
import router from "next/dist/client/router";
import { InputField } from "../components/forms/InputField";
import { TextArea } from "../components/forms/TextArea";
import { Box, Button } from "@chakra-ui/react";
import { useCreateProjectMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";

 const CreateProject: React.FC<{}> = ({}) => {
   const [, createProject] = useCreateProjectMutation();
   return (
     <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async (values, { setErrors }) => {
          // test userId
          // need to add error handling in resolver
          // this isnt effective
          const response = await createProject({input: values, ownerId: "ab7ffb6c-c6e2-4565-b425-5dff863cfa81"});
         if(response.error){
          setErrors({title: 'error in title', description: 'error in description'})
         } else if(response.data){
           console.log(response.data)
          router.push("/")
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