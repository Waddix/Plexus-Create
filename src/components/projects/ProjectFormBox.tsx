import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import React, { useContext } from "react";
import { ProjectsContext } from "../../context/projectsContext";
import { UserContext } from "../../context/userContext";
import { useCreateProjectMutation } from "../../generated/graphql";
import { InputField } from "../forms/InputField";
import { TextArea } from "../forms/TextArea";
import { AllTags } from "./TagSelection";

interface ImageInfo {
  uploadingImage: boolean;
  projectImage: string;
}

export const ProjectFormBox = ({
  uploadingImage,
  projectImage,
}: ImageInfo): JSX.Element => {
  const [, createProject] = useCreateProjectMutation();
  const { userProfile } = useContext(UserContext);
  const { projectTag } = useContext(ProjectsContext);
  return (
    <Container>
      <Box m={2}>
        <Heading h="inherit">Select Tags</Heading>
        <AllTags></AllTags>
      </Box>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createProject({
            input: Object.assign({ ...values }, { image: projectImage }),
            ownerId: userProfile.id,
            tagId: projectTag,
          });
          if (response.error) {
            setErrors({
              title: "Please enter a title",
              description: "Please enter a description",
            });
          } else if (response.data) {
            router.push("/projects");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Project Title"
              label="Title"
            />
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
              isDisabled={uploadingImage}
            >
              Submit Project
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
