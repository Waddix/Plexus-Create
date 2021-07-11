import { Heading } from "@chakra-ui/react";
import { Box, Button, Container } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/dist/client/router";
import React from "react";
import { useCreatePositionMutation } from "../../generated/graphql";
import { InputField } from "../forms/InputField";
import { SelectOptions } from "../forms/SelectOptions";
import { TextArea } from "../forms/TextArea";

interface PositionFormProps {
  id: number | undefined;
}

export const PositionForm = ({id}: PositionFormProps): JSX.Element => {
  const [, createPosition] = useCreatePositionMutation();
  return (
    <Container>
      <Heading fontSize="lg" mt={3} mb={4}>
          Add Positions
        </Heading>
      <Formik
        initialValues={{ title: "", description: "" , type: ""}}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPosition({
            input: values,
            projectId: id
          });
          if (response.error) {
            setErrors({
              title: "error in title",
              description: "error in description",
            });
          } else if (response.data) {
            router.push(`/projects/${id}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <SelectOptions
              label="Position type"
              name="type"
              selectProps={{ placeholder: "Full-Time", }}
            >
              <option value="Full-Time">Full-Time</option>
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
