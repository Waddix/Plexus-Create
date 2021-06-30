import React, { Fragment, useContext } from "react";
import { FormLabel, Input, Box, Image, Heading, useColorModeValue, chakra, Flex, Icon, Stack, VisuallyHidden, Text } from '@chakra-ui/react';
import { UserContext } from "../../../context/userContext";

export default function ImageUpload({ updateImage }): JSX.Element {

  const { userProfile } = useContext(UserContext);

  return (
    <Fragment>
      <Box d='block' textAlign='center' width='100%'>
        <Heading as="h4" size="md">Current Picture:</Heading>
        <Image
          mt={4}
          marginLeft='auto'
          marginRight='auto'
          boxSize="7rem"
          objectFit="cover"
          src={userProfile.image}
          alt={userProfile.name}
        />
      </Box>
      <Box mt={7}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          textAlign='center'
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Upload your photo
        </FormLabel>
        <Flex
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          borderColor={useColorModeValue("gray.300", "gray.500")}
          borderStyle="dashed"
          rounded="md"
        >
          <Stack spacing={1} textAlign="center">
            <Icon
              mx="auto"
              boxSize={12}
              color={useColorModeValue("gray.400", "gray.500")}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
            <Flex
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
              alignItems="baseline"
            >
              <chakra.label
                for="image"
                cursor="pointer"
                rounded="md"
                fontSize="md"
                pos="relative"
                _hover={{
                  color: useColorModeValue("orange.400", "orange.300"),
                }}
              >
                <Fragment>
                  <FormLabel htmlFor="image">Upload a custom image</FormLabel>
                  <VisuallyHidden>
                    <Input type="file" id="image" />
                  </VisuallyHidden>
                </Fragment>

              </chakra.label>
              <Text pl={1}>or drag and drop</Text>
            </Flex>
            <Text
              fontSize="xs"
              color={useColorModeValue("gray.500", "gray.50")}
            >
              PNG, JPG, GIF up to 10MB
            </Text>
          </Stack>
        </Flex>
      </Box>
    </Fragment >
  )
}