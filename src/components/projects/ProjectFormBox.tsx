import { Box, Button, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/dist/client/router';
import React, { useContext,} from 'react'
import { UserContext } from '../../context/userContext';
import { useCreateProjectMutation } from '../../generated/graphql';
import { InputField } from '../forms/InputField';
import { TextArea } from '../forms/TextArea';
import { ProjectTags } from './ProjectTags';

// interface ProjectFormBoxProps {

// }

export const ProjectFormBox: React.FC<unknown> = ({}) => {
  const [, createProject] = useCreateProjectMutation();
  const { userProfile } = useContext(UserContext);
    return (
      <Formik
      initialValues={{ title: "", description: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await createProject({ input: values, ownerId: parseInt(userProfile.id) });
        if (response.error) {
          console.log(response.error?.message)
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
          <Flex mt={2}>
          <ProjectTags/>
          </Flex>
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
    );
}