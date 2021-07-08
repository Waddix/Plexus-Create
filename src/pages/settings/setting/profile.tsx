import {
  Avatar,
  Box,
  Flex,
  chakra,
  FormLabel,
  Heading,
  Input,
  VisuallyHidden,
  useColorModeValue,
  Spacer,
  Text,
  VStack,
  Button,
  Icon,
  Divider,
  HStack
} from "@chakra-ui/react"
import React, { Fragment, useContext, useState } from "react"
import { UserContext } from "../../../context/userContext"
import { FaUserEdit, FaEdit, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { stringify } from "querystring";

const Profile = (): JSX.Element => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  const { image, name, username, title, bio } = userProfile

  // Handle uploading images
  const handleImageUpload = () => {
    return;
  }

  // Which fields are being edited
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [userNameEdit, setUsernameEdit] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [bioEdit, setBioEdit] = useState<boolean>(false);

  // Updated user before submitting
  interface UpdatedUser {
    name: string,
    username: string,
    title: string,
    bio: string,
    image: string,
  }

  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({
    name: name,
    username: username,
    title: title,
    bio: bio,
    image: image,
  });

  return (
    <VStack
      w="100%"
      alignContent="center"
      align={["stretch", "center"]}
    >
      <Flex
        alignItems="center"
        flexDirection="column"
      >
        <Box
          // textAlign="center"
          width="100%"
          d="inline-flex"
          alignItems="center"
          flexDirection="column"
        >
          <Avatar
            name="userProfile.name"
            src={image}
            size="xl"
          />
          <form onSubmit={handleImageUpload}>
            <chakra.label
              for="image"
              cursor="pointer"
              rounded="md"
              fontSize="md"
              pos="relative"
              textAlign="center"
            >
              <Fragment>
                <FormLabel
                  htmlFor="image"
                  bg="whiteAlpha.200"
                  width="max-content"
                  rounded="md"
                  px={2}
                  py={2}
                  mt={4}
                  textAlign="center"
                  _hover={{
                    bg: useColorModeValue("orange.200", "orange.700"),
                  }}
                >Upload a custom image
                </FormLabel>
                <VisuallyHidden>
                  <Input type="file" id="image" />
                </VisuallyHidden>
              </Fragment>
            </chakra.label>
          </form>
        </Box>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          w={["100%", "25rem"]}
        >
          <VStack
            alignItems="left"
            spacing={8}
          >
            <Flex
              flexDirection="row"
              justifyContent="start"
              alignContent="center"
            >
              {!nameEdit &&
                (
                  <Button
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('orange.200', 'orange.700'),
                    }}
                    variant="ghost"
                    px={2}
                    py={2}
                    mr={2}
                    size="sm"
                    fontSize='1rem'
                    onClick={() => setNameEdit(true)}
                  >
                    <Icon
                      as={FaUserEdit}
                    />
                  </Button>
                )
              }
              {nameEdit &&
                (
                  <Fragment>
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }}
                      variant="ghost"
                      px={2}
                      py={2}
                      mr={2}
                      size="sm"
                      fontSize='1rem'
                      onClick={() => {
                        setNameEdit(false)
                      }}
                    >
                      <Icon
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
                      size="sm"
                      fontSize='1rem'
                      onClick={() => {
                        setNameEdit(false)
                      }
                      }
                    >
                      <Icon
                        as={FaTimesCircle}
                      />
                    </Button>
                  </Fragment>
                )
              }
              <Heading size="md">
                Name:
              </Heading>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="start"
              alignContent="center"
            >
              {!userNameEdit &&
                (
                  <Button
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('orange.200', 'orange.700'),
                    }}
                    variant="ghost"
                    px={2}
                    py={2}
                    mr={2}
                    size="sm"
                    fontSize='1rem'
                    onClick={() => setUsernameEdit(true)}
                  >
                    <Icon
                      as={FaUserEdit}
                    />
                  </Button>
                )
              }
              {userNameEdit &&
                (
                  <Fragment>
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }}
                      variant="ghost"
                      px={2}
                      py={2}
                      mr={2}
                      size="sm"
                      fontSize='1rem'
                      onClick={() => {
                        setUsernameEdit(false)
                      }}
                    >
                      <Icon
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
                      size="sm"
                      fontSize='1rem'
                      onClick={() => {
                        setUsernameEdit(false)
                      }
                      }
                    >
                      <Icon
                        as={FaTimesCircle}
                      />
                    </Button>
                  </Fragment>
                )
              }
              <Heading size="md">
                Username:
              </Heading>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="start"
              alignContent="center"
            >
              {!titleEdit &&
                (
                  <Button
                    _hover={{
                      textDecoration: 'none',
                      bg: useColorModeValue('orange.200', 'orange.700'),
                    }}
                    variant="ghost"
                    px={2}
                    py={2}
                    mr={2}
                    size="sm"
                    fontSize='1rem'
                    onClick={() => setTitleEdit(true)}
                  >
                    <Icon
                      as={FaUserEdit}
                    />
                  </Button>
                )
              }
              {titleEdit &&
                (
                  <Fragment>
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }}
                      variant="ghost"
                      px={2}
                      py={2}
                      mr={2}
                      size="sm"
                      fontSize='1rem'
                      onClick={() => {
                        setTitleEdit(false)
                      }}
                    >
                      <Icon
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
                      size="sm"
                      fontSize='1rem'
                      onClick={() => {
                        setTitleEdit(false)
                      }
                      }
                    >
                      <Icon
                        as={FaTimesCircle}
                      />
                    </Button>
                  </Fragment>
                )
              }
              <Heading size="md">
                Title:
              </Heading>
            </Flex>
          </VStack>
          <Spacer />
          <VStack
            alignItems="end"
            // width='max-content'
            spacing={8}
          >
            <Text>
              {name}
            </Text>
            <Text>
              {username}
            </Text>
            <Text>
              {title || "No title set"}
            </Text>
          </VStack>
        </Flex >
      </Flex >
      <Divider orientation="horizontal" />
      <VStack
        w="100%"
        alignContent="center"
        align={["stretch", "center"]}
      >
        <Flex
          alignItems="center"
          flexDirection="column"
          w="max-content"
        >
          <Heading>Bio</Heading>
          <Box
            my={4}
            width="100%"
          >
            <Box
              w="100%"
            >
              {bio ?
                bio.map((line: string) => {
                  return (
                    <Text
                      key={line.replace(" ", "-")}
                      textAlign="center"
                      w="100%"
                    >
                      {line}
                    </Text>
                  )
                })
                :
                (
                  <Text
                    textAlign="center"
                    w="100%"
                  >
                    No bio set
                  </Text>
                )
              }
            </Box>
          </Box>
          {!bioEdit &&
            (
              <Button
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
                variant="ghost"
                px={2}
                py={2}
                size="md"
                fontSize='1.5rem'
                onClick={() => setBioEdit(true)}
              >
                <Icon
                  as={FaEdit}
                />
              </Button>
            )
          }
          {bioEdit &&
            (
              <HStack>
                <Button
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('orange.200', 'orange.700'),
                  }}
                  variant="ghost"
                  px={2}
                  py={2}
                  size="md"
                  fontSize='1.5rem'
                  onClick={() => setBioEdit(false)}
                >
                  <Icon
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
                  size="md"
                  fontSize='1.5rem'
                  onClick={() => {
                    setBioEdit(false)
                  }}
                >
                  <Icon
                    as={FaTimesCircle}
                  />
                </Button>
              </HStack>
            )
          }
        </Flex>
      </VStack>
    </VStack >
  )
}

export default Profile;
