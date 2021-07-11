import React from "react";
import { useCreatePostMutation } from "../../generated/graphql";
import { Formik, Form } from "formik";
import { Box, Button, Container } from "@chakra-ui/react";

import { TextArea } from "../forms/TextArea";

interface PostProps {
  projectId: number,
  ownerId: number
}
export const PostFormBox: React.FC<PostProps> = ({ projectId, ownerId }) => {
  const [, createPost] = useCreatePostMutation();
  return (
    <Container>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const post = await createPost({
            projectId,
            ownerId,
            text: values.text,
          });
          if (post.error) {
            console.log(post.error?.message);
            setErrors({
              text: "error in update",
            });
          } else if (post.data) {
            console.log(post.data);

          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <TextArea
                name="text"
                placeholder="What's new?"
                label="Post"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="orange"
              isLoading={isSubmitting}
            >
              Post
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};