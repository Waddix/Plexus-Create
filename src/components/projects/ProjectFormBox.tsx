import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useCreateProjectMutation } from "../../generated/graphql";
import { InputField } from "../forms/InputField";
import { TextArea } from "../forms/TextArea";

interface ImageInfo {
  uploadingImage: boolean,
  projectImage: string,
}

const ProjectFormBox = ({ uploadingImage, projectImage }: ImageInfo): JSX.Element => {
  const [, createProject] = useCreateProjectMutation();
  const { userProfile } = useContext(UserContext);
  return (
    <Container>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createProject({
            input: Object.assign({ ...values }, { image: projectImage }),
            ownerId: userProfile.id,
          });
          if (response.error) {
            console.log(response.error?.message);
            setErrors({
              title: "error in title",
              description: "error in description",
            });
          } else if (response.data) {
            console.log(response.data);
            router.push("/projects");
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

export default ProjectFormBox;