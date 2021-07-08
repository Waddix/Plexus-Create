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
  HStack,
  Skeleton,
  SkeletonCircle,
  FormControl,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Textarea,
} from "@chakra-ui/react"
import React, { Fragment, useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/userContext"
import { FaUserEdit, FaEdit, FaTimesCircle, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { stringify } from "querystring";

const Profile = (): JSX.Element => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile } = useContext(UserContext)

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

  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);

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

  useEffect(() => {
    if (userProfile && !loadingProfile) {
      setUpdatedUser({
        name: name,
        username: username.split("@")[1],
        title: title,
        bio: bio,
        image: image,
      })
    }
  }, [userProfile, loadingProfile])

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
          {loadingProfile ?
            <SkeletonCircle size="6rem" />
            :
            image.length > 0 ?
              < Avatar
                name="userProfile.name"
                src={image}
                size="xl"
              />
              :
              <Icon boxSize={10} as={FaUserCircle} />
          }

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
                >
                  <Skeleton
                    isLoaded={!loadingProfile}
                  >
                    Upload a custom image
                  </Skeleton>
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
                    isLoading={loadingProfile}
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
                      isDisabled={
                        updatedUser.name.length === 0
                        ||
                        updatedUser.name === name
                      }
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
                      }}
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
                    isLoading={loadingProfile}
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
                      isDisabled={
                        usernameInvalid
                        ||
                        updatedUser.username.length === 0
                        ||
                        updatedUser.username === username.split("@")[1]
                      }
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
                      }}
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
                    isLoading={loadingProfile}
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
                      isDisabled={
                        updatedUser.title.length === 0
                        ||
                        updatedUser.title === title
                      }
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
                      }}
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
            <Skeleton
              isLoaded={!loadingProfile}
            >
              <Text>
                {loadingProfile ?
                  "Loading Profile..."
                  :
                  nameEdit ?
                    <Input
                      value={updatedUser.name}
                      placeholder={updatedUser.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        const newUser = updatedUser;
                        newUser.name = newName;
                        setUpdatedUser(Object.assign({ ...newUser }))
                      }}
                    />
                    :
                    name
                }
              </Text>
            </Skeleton>
            <Skeleton
              isLoaded={!loadingProfile}
            >
              <Text>
                {loadingProfile ?
                  "Loading Profile..."
                  :
                  userNameEdit ?
                    <FormControl id="username">
                      <InputGroup>
                        <InputLeftAddon
                          children="@"
                          bg={useColorModeValue("gray.50", "gray.800")}
                          color={useColorModeValue("gray.500", "gay.50")}
                          rounded="md"
                        />
                        <Input
                          required
                          validationMessage="Should not start with @"
                          isInvalid={usernameInvalid}
                          value={updatedUser.username}
                          onChange={(e) => {
                            const newUsername = e.target.value;
                            const newUser = updatedUser;
                            newUser.username = newUsername;
                            setUpdatedUser(Object.assign({ ...newUser }))

                            if (e.target.value[0] === '@') {
                              setUsernameInvalid(true);
                            } else if (e.target.value[0] !== '@') {
                              setUsernameInvalid(false);
                            }
                          }}
                          id="username"
                          placeholder={updatedUser.username || "Username"}
                          errorBorderColor="red.300"
                        />
                      </InputGroup>
                      {usernameInvalid &&
                        <FormHelperText color="red.300">Should not start with @</FormHelperText>
                      }
                    </FormControl>
                    :
                    username
                }
              </Text>
            </Skeleton>
            <Skeleton
              isLoaded={!loadingProfile}
            >
              <Text>
                {loadingProfile ?
                  "Loading Profile..."
                  :
                  titleEdit ?
                    <Input
                      value={updatedUser.title}
                      placeholder={updatedUser.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const newUser = updatedUser;
                        newUser.title = newTitle;
                        setUpdatedUser(Object.assign({ ...newUser }))
                      }}
                    />
                    :
                    title ?
                      title
                      :
                      "No Title Set"
                }
              </Text>
            </Skeleton>
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
          width="100%"
        >
          <Heading>Bio</Heading>
          <Box
            my={4}
            width="100%"
          >
            <Box
              w="100%"
              textAlign="center"
            >
              {loadingProfile ?
                <Fragment>
                  <Skeleton
                    isLoaded={!loadingProfile}
                  >
                    <Text
                      textAlign="center"
                      w="100%"
                      my={2}
                    >
                      Loading Profile..
                    </Text>
                  </Skeleton>
                  <Skeleton
                    isLoaded={!loadingProfile}
                  >
                    <Text
                      textAlign="center"
                      w="100%"
                      my={2}
                    >
                      Loading Profile..
                    </Text>
                  </Skeleton>
                  <Skeleton
                    isLoaded={!loadingProfile}
                  >
                    <Text
                      textAlign="center"
                      w="100%"
                      my={2}
                    >
                      Loading Profile..
                    </Text>
                  </Skeleton>
                </Fragment>
                :
                bioEdit ?

                  <Textarea
                    onChange={(e) => {
                      const newBio = e.target.value;
                      const newUser = updatedUser;
                      newUser.bio = newBio;
                      setUpdatedUser(Object.assign({ ...newUser }))
                    }}
                    placeholder={bio ? bio : "Write something about yourself"}
                    width={["100%", "100%", "100%", "500px"]}
                  />
                  :
                  bio ?
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
                isLoading={loadingProfile}
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
                  isDisabled={
                    updatedUser.bio.length === 0
                    ||
                    updatedUser.bio === bio
                  }
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
