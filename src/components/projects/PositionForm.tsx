import { Box, Button, Container } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useCreatePositionMutation } from "../../generated/graphql";
import { InputField } from "../forms/InputField";
import { SelectOptions } from "../forms/SelectOptions";
import { TextArea } from "../forms/TextArea";

interface ProjectFormProps {
  id: number;
}

export const ProjectFormBox = ({id}: ProjectFormProps): JSX.Element => {
  const [, createPosition] = useCreatePositionMutation();
  const { userProfile } = useContext(UserContext);
  return (
    <Container>
      <Formik
        initialValues={{ title: "", description: "" , type: ""}}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPosition({
            input: values,
            projectId: id
          });
          if (response.error) {
            console.log(response.error?.message);
            setErrors({
              title: "error in title",
              description: "error in description",
            });
          } else if (response.data) {
            console.log(response.data);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <SelectOptions
              label="Position type"
              name="type"
              selectProps={{ placeholder: "Full-Time", value: "Full-Time" }}
            >
              <option value="Part-Time">Part-Time</option>
              <option value="Commision/Contract">Commission/Contract Work</option>
            </SelectOptions>
            <InputField
              name="title"
              placeholder="Position Title"
              label="Title"
            />
            <Box mt={4}>
              <TextArea
                name="description"
                placeholder="Position Description"
                label="Description"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="orange"
              isLoading={isSubmitting}
            >
              Add Position
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
