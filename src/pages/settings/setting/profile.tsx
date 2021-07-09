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
  Link,
  Image,
} from "@chakra-ui/react"
import React, { Fragment, SetStateAction, useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/userContext"
import { FaUserEdit, FaEdit, FaTimesCircle, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { useUpdateProfileMutation } from '../../../generated/graphql'
import { withUrqlClient } from 'next-urql';
import { useSession } from 'next-auth/client'

const Profile: React.FC<unknown> = (): JSX.Element => {
  // Next auth session
  const [session] = useSession();

  // User Profile Context
  const { userProfile, setUserProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile } = useContext(UserContext)

  const { id, image, name, username, title, bio, website } = userProfile

  // Which fields are being edited
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [userNameEdit, setUsernameEdit] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [bioEdit, setBioEdit] = useState<boolean>(false);

  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);

  // Updated user before submitting
  interface UpdatedUser {
    id: number,
    name: string,
    username: string,
    title: string,
    bio: string,
    image: string,
    website: string
  }

  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({
    id: id,
    name: name,
    username: username,
    title: title,
    bio: bio,
    image: image,
    website: website,
  });

  // Add current user's details to the updateUser state since it is used as the initial form values and placeholders.
  useEffect(() => {
    if (userProfile && !loadingProfile) {
      setUpdatedUser({
        id: id,
        name: name,
        username: username.split("@")[1],
        title: title,
        bio: bio,
        image: image,
        website: website,
      })
    }
  }, [userProfile, loadingProfile])

  // Render loading icons when submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Update Profile Mutation
  const [, updateProfile] = useUpdateProfileMutation()

  const handleSubmit = () => {
    const newProfile = Object.assign({ ...updatedUser });
    newProfile.username = "@" + updatedUser.username;

    updateProfile({ input: newProfile })
      .then(() => {
        setIsSubmitting(false);
        setUserProfile(Object.assign({ ...newProfile, ...userProfile }))
        setNameEdit(false);
        setUsernameEdit(false);
        setBioEdit(false);
        setTitleEdit(false);
      })
  }

  const [file, setFile] = useState<SetStateAction<string> | File | null>(null)

  // Handle uploading images
  const handleImageInput = (files: FileList | SetStateAction<string>[] | null) => {
    if (files) {
      console.info(files[0])
      setFile(files[0]);
    }
  }

  return session ? (
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

          <form>
            <Fragment>
              <chakra.label
                for="image"
                cursor="pointer"
                rounded="md"
                fontSize="md"
                pos="relative"
                textAlign="center"
              >
                <FormLabel
                  htmlFor="image"
                  bg="whiteAlpha.200"
                  width="max-content"
                  rounded="md"
                  px={2}
                  py={2}
                  mt={4}
                  mx="auto"
                  textAlign="center"
                  _hover={{
                    bg: useColorModeValue("orange.200", "orange.700"),
                    cursor: loadingProfile ? "not-allowed" : "pointer"
                  }}
                >
                  <Skeleton
                    isLoaded={!loadingProfile}
                  >
                    Upload a custom image
                  </Skeleton>
                </FormLabel>
                <VisuallyHidden>
                  <Input isDisabled={loadingProfile} type="file" id="image" onChange={(e) => handleImageInput(e.target.files)} />
                </VisuallyHidden>
              </chakra.label>
              {file &&
                <Fragment>
                  <VStack my={2} alignContent="center" justifyContent="center">
                    <Avatar
                      src={URL.createObjectURL(file)}
                      name={file.name}
                      size="xl"
                    />
                    <Text color="gray.300">{file.name}</Text>
                  </VStack>
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
                      size="sm"
                      fontSize='1rem'
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsSubmitting(true);
                      }}
                      isLoading={isSubmitting}
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
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile("")
                      }}
                      isDisabled={isSubmitting}
                    >
                      <Icon
                        as={FaTimesCircle}
                      />
                    </Button>
                  </HStack>
                </Fragment>
              }
            </Fragment>
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
                        setIsSubmitting(true);
                        handleSubmit()
                      }}
                      isDisabled={
                        updatedUser.name.length === 0
                        ||
                        updatedUser.name === name
                      }
                      isLoading={isSubmitting}
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
                      isDisabled={isSubmitting}
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
                        setIsSubmitting(true);
                        handleSubmit()
                      }}
                      isDisabled={
                        usernameInvalid
                        ||
                        updatedUser.username.length === 0
                        ||
                        updatedUser.username === username.split("@")[1]
                        ||
                        updatedUser.username.split(" ").length > 1
                      }
                      isLoading={isSubmitting}
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
                      isDisabled={isSubmitting}
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
                        setIsSubmitting(true);
                        handleSubmit()
                      }}
                      isDisabled={
                        updatedUser.title.length === 0
                        ||
                        updatedUser.title === title
                      }
                      isLoading={isSubmitting}
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
                      isDisabled={isSubmitting}
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
                      {updatedUser.username.split(" ").length > 1 &&
                        <FormHelperText color="red.300">Usernames cannot contain spaces</FormHelperText>
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
                    bio.split('\n').map((line: string) => {
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
                  onClick={() => {
                    setIsSubmitting(true);
                    handleSubmit()
                  }}
                  isDisabled={
                    updatedUser.bio.length === 0
                    ||
                    updatedUser.bio === bio
                  }
                  isLoading={isSubmitting}
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
                  isDisabled={isSubmitting}
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
    :
    (
      <Box
        w="100%"
        textAlign="center"
      >
        <Heading
          color="red.200"
          my={150}
        >
          Not Authorized
        </Heading>
        <Box
          mb={100}
        >
          <Link
            href="/api/auth/signin"
          >
            <Button
              w="max-content"
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
            >
              Please sigin or register first
            </Button>
          </Link>
        </Box>
      </Box>
    )
}

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(Profile);
