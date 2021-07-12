import React, { Fragment, useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Icon,
  VisuallyHidden,
  Button,
  Collapse,
  HStack,
  VStack,
  Image
} from "@chakra-ui/react";
import ProjectFormBox from "./ProjectFormBox";
import { FaCheckCircle, FaTimesCircle, FaImage } from "react-icons/fa";
import Axios from 'axios';

export default function Component(): JSX.Element {

  const [uploadingImage, setUploadingImage] = useState<boolean>(false)

  // Handle images input to display a preview of the file
  const [file, setFile] = useState<File | File[] | null>(null)

  const handleImageInput = (files: FileList | React.SetStateAction<File | File[] | null>[] | null): void => {
    if (files !== null) {
      const file = files[0];
      setFile(file);
    }
  }

  // Handle file upload to cloudinary

  const [projectPic, setProjectPic] = useState<string | null>(null);

  const handleUpload = async (file: File | File[]): Promise<void> => {
    if (file && !Array.isArray(file)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "h328zmnd");

      const newPic = await Axios.post(`https://api.cloudinary.com/v1_1/plexus-create/image/upload`, formData)
        .then(res => {
          if (res.status === 200) {
            const { secure_url: newPic } = res.data;
            return newPic
          } else if (res.status < 400) {
            // Show error here
          }
        })

      if (newPic && typeof newPic === "string") {
        setUploadingImage(false);
        setProjectPic(newPic);
        setFile(null);
      }
    }
    return;
  }

  // Then inside the component body
  return (
    <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                New Project
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Enter details about your project
              </Text>
            </Box>
          </GridItem>
          <GridItem
            mt={[5, null, 0]}
            colSpan={{ md: 2 }}
            bg={useColorModeValue("white", "gray.700")}
            shadow="base"
            rounded={[null, "md"]}
            overflow={{ sm: "hidden" }}
          >
            <chakra.form
              method="#"
            >
              <Stack
                px={4}
                py={5}
                spacing={6}
                p={{ sm: 6 }}
              >
                {/* <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Website
                    </FormLabel>
                    <InputGroup size="sm">
                      <InputLeftAddon
                        // eslint-disable-next-line react/no-children-prop
                        children="http://"
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md"
                      />
                      <Input
                        type="url"
                        placeholder="www.example.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid> */}
                <Fragment>
                  <Box d='block' textAlign='center' width='100%'>
                    <Heading as="h4" size="md">Current Picture:</Heading>
                    {projectPic ?
                      <Image
                        mt={4}
                        marginLeft='auto'
                        marginRight='auto'
                        height="7rem"
                        objectFit="cover"
                        src={projectPic}
                        alt={projectPic}
                      />
                      :
                      <Icon
                        as={FaImage}
                        boxSize="7rem"
                      />
                    }
                  </Box>
                  <Collapse
                    in={file ? false : true}
                    animateOpacity
                  >
                    <Box textAlign="center" mx={4}>
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
                              setUploadingImage(true);
                              if (file) {
                                handleUpload(file);
                              }
                            }}
                            isLoading={uploadingImage}
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
                              setFile(null);
                              setProjectPic(null);
                            }}
                            isDisabled={uploadingImage}
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
              </Stack>
            </chakra.form>
            <Box
              mt={4}
              mx={4}
              mb={10}
            >
              <ProjectFormBox
                uploadingImage={uploadingImage}
                projectImage={projectPic ? projectPic : ""}
              >
              </ProjectFormBox>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
