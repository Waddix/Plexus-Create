import React, { Fragment, useState } from "react";
import {
  FormLabel,
  Input,
  Box,
  Image,
  Heading,
  useColorModeValue,
  chakra,
  Flex,
  Icon,
  Stack,
  VisuallyHidden,
  Text,
  VStack,
  Button,
  HStack,
  Collapse
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Axios from "axios"

export default function ImageUpload({ image, updateImage, name, uploading, updateUploading, profileImage }): JSX.Element {
  // Handle images input to display a preview of the file
  const [file, setFile] = useState<File | File[] | null>(null)

  const handleImageInput = (files: FileList | React.SetStateAction<File | File[] | null>[] | null): void => {
    if (files !== null) {
      const file = files[0];
      setFile(file);
    }
  }

  // Handle file upload to cloudinary

  const handleUpload = async (file: File | File[]): Promise<void> => {
    if (file && !Array.isArray(file)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "blmanvfk");

      const newPic = await Axios.post(`https://api.cloudinary.com/v1_1/plexus-create/image/upload`, formData)
        .then(res => {
          if (res.status === 200) {
            const { secure_url: newPic } = res.data;
            return newPic
          } else if (res.status < 400) {
            // Show error code here
          }
        })

      if (newPic && typeof newPic === "string") {
        updateUploading(false);
        setFile(null);
        updateImage(newPic);
      }
    }
    return;
  }

  return (
    <Fragment>
      <Box d='block' textAlign='center' width='100%'>
        <Heading as="h4" size="md">Current Picture:</Heading>
        <Image
          mt={4}
          marginLeft='auto'
          marginRight='auto'
          height="7rem"
          objectFit="cover"
          src={image}
          alt={name}
        />
      </Box>
      <Collapse
        in={file ? false : true}
        animateOpacity
      >
        <Box textAlign="center" mt={7}>
          <Heading
            fontSize="xl"
            color={useColorModeValue("gray.700", "gray.50")}
            mb={4}
          >
            Upload your photo
          </Heading>
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
                  strokeLinecap="round"
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
                      <Input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={(e) => handleImageInput(e.target.files)}
                      />
                    </VisuallyHidden>
                  </Fragment>

                </chakra.label>
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
      </Collapse>
      <Collapse
        in={file ? true : false}
        animateOpacity
      >
        <Box mt={2}>
          <VStack
            mt={1}
            justifyContent="center"
            alignContent="center"
            textAlign="center"
            px={6}
            pt={5}
            pb={6}
          >
            <Heading
              fontSize="xl"
              color={useColorModeValue("gray.700", "gray.50")}
              mb={4}
            >
              Selected Picture:
            </Heading>
            {file &&
              <VStack my={2} alignContent="center" justifyContent="center">
                <Image
                  mt={4}
                  marginLeft='auto'
                  marginRight='auto'
                  height="7rem"
                  objectFit="cover"
                  src={URL.createObjectURL(file)}
                  alt={Array.isArray(file) ? "" : file.name}
                />
                <Text color="gray.300">{Array.isArray(file) ? "" : file.name}</Text>
              </VStack>
            }
            <HStack my={2} alignContent="center" justifyContent="center">
              <Button
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
                variant="ghost"
                px={2}
                py={2}
                mr={2}
                size="md"
                fontSize='1rem'
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  updateUploading(true);
                  if (file) {
                    handleUpload(file);
                  }
                }}
                isLoading={uploading}
              >
                <Icon
                  boxSize={6}
                  as={FaCheckCircle}
                />
              </Button>
              <Button
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
                variant="ghost"
                px={2}
                py={2}
                mr={2}
                size="md"
                fontSize='1rem'
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null)
                  updateImage(profileImage)
                }}
                isDisabled={uploading}
              >
                <Icon
                  boxSize={6}
                  as={FaTimesCircle}
                />
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Collapse>
    </Fragment >
  )
}