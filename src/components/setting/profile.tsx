/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
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
  Collapse,
} from "@chakra-ui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { FaUserEdit, FaEdit, FaTimesCircle, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { useUpdateProfileMutation } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { useSession } from 'next-auth/client';
import Axios from 'axios';

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
  const [websiteEdit, setWebsiteEdit] = useState<boolean>(false);
  const [bioEdit, setBioEdit] = useState<boolean>(false);

  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);
  const [websiteInvalid, setWebsiteInvalid] = useState<boolean>(false);

  const [anyInvalid, setAnyInvalid] = useState<boolean>(false);

  useEffect(() => {
    if (usernameInvalid || websiteInvalid) {
      setAnyInvalid(true)
    }

    if (!usernameInvalid && !websiteInvalid) {
      setAnyInvalid(false);
    }
  }, [usernameInvalid, websiteInvalid])

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
        setWebsiteEdit(false);
        setTitleEdit(false);
      })
  }


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
        const newProfile = Object.assign({ ...updatedUser });
        newProfile.username = "@" + updatedUser.username;
        newProfile.image = newPic;

        updateProfile({ input: newProfile })
          .then(() => {
            setIsSubmitting(false);
            setUserProfile(Object.assign({ ...newProfile, ...userProfile }))
            setFile(null)
            setNameEdit(false);
            setUsernameEdit(false);
            setBioEdit(false);
            setTitleEdit(false);
            setWebsiteEdit(false);
          })
      }
    }
    return;
  }

  return session ? (
    <VStack
      w="100%"
      alignContent="center"
      align={["stretch", "center"]}
    >
      <VStack
        alignItems="center"
        w={{ base: "100%", lg: "80%" }}
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
                name={userProfile.name}
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
                  my={4}
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
                    {file ? "Change your image" : "Upload a custom image"}
                  </Skeleton>
                </FormLabel>
                <VisuallyHidden>
                  <Input
                    isDisabled={loadingProfile}
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={(e) => handleImageInput(e.target.files)}
                  />
                </VisuallyHidden>
              </chakra.label>
              <Collapse
                in={file ? true : false}
                animateOpacity
              >
                <Fragment>
                  {file &&
                    <VStack my={2} alignContent="center" justifyContent="center">
                      <Avatar
                        src={URL.createObjectURL(file)}
                        name={Array.isArray(file) ? "" : file.name}
                        size="xl"
                      />
                      <Text color="gray.300">{Array.isArray(file) ? "" : file.name}</Text>
                    </VStack>
                  }
                  <HStack my={2} alignContent="center" justifyContent="center">
                    <Button
                      isDisabled={
                        isSubmitting
                        ||
                        anyInvalid
                      }
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
                        if (file) {
                          setIsSubmitting(true);
                          handleUpload(file);
                        }
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
                        setFile(null)
                      }}
                      isDisabled={isSubmitting}
                    >
                      <Icon
                        as={FaTimesCircle}
                      />
                    </Button>
                  </HStack>
                </Fragment>
              </Collapse>
            </Fragment>
          </form>
        </Box>

        <VStack
          alignItems="center"
          justifyContent="space-between"
          spacing={6}
          w="100%"
        >
          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <HStack
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
              w="max-content"
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
                        ||
                        isSubmitting
                        ||
                        anyInvalid
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
                        const newUser = updatedUser;
                        newUser.name = name ? name : "";
                        setUpdatedUser(Object.assign({ ...newUser }));
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
            </HStack>
            {loadingProfile ?
              (
                <Box>
                  <Spacer />
                  <Skeleton
                    isLoaded={!loadingProfile}
                  >
                    "Loading Profile..."
                  </Skeleton>
                </Box>
              )
              :
              nameEdit ?
                <Box>
                  <Spacer d={{ base: "none", lg: "flex" }} />
                  <Input
                    w="100%"
                    value={updatedUser.name}
                    placeholder={name || "Name"}
                    onChange={(e) => {
                      const newName = e.target.value;
                      const newUser = updatedUser;
                      newUser.name = newName;
                      setUpdatedUser(Object.assign({ ...newUser }))
                    }}
                  />
                </Box>
                :
                (
                  <Box>
                    <Spacer />
                    <Text>{name}</Text>
                  </Box>
                )
            }
          </HStack>

          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <HStack
              spacing={{ base: 0, md: 1 }}
              alignItems="center"
              justifyContent="space-between"
              w="max-content"
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
                        ||
                        isSubmitting
                        ||
                        anyInvalid
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
                        setUsernameInvalid(false);
                        const newUser = updatedUser;
                        newUser.username = username ? username.split('@')[1] : "";
                        setUpdatedUser(Object.assign({ ...newUser }));
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
            </HStack>
            {loadingProfile ?
              <Box>
                <Spacer />
                <Skeleton
                  isLoaded={!loadingProfile}
                >
                  "Loading Profile..."
                </Skeleton>
              </Box>
              :
              userNameEdit ?
                <Box>
                  <Spacer d={{ base: "none", lg: "flex" }} />
                  <FormControl id="username">
                    <InputGroup>
                      <InputLeftAddon
                        // eslint-disable-next-line react/no-children-prop
                        children="@"
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md"
                        p={{ base: 2, md: 4 }}
                      />
                      <Input
                        w="100%"
                        required
                        isInvalid={usernameInvalid}
                        value={updatedUser.username}
                        onChange={(e) => {
                          const newUsername = e.target.value;
                          const newUser = updatedUser;
                          newUser.username = newUsername;
                          setUpdatedUser(Object.assign({ ...newUser }))
                          if (e.target.value[0] === '@' || e.target.value.split(" ").length > 1) {
                            setUsernameInvalid(true);
                          } else if (e.target.value[0] !== '@') {
                            setUsernameInvalid(false);
                          }
                        }}
                        id="username"
                        placeholder={username || "Username"}
                        errorBorderColor="red.300"
                      />
                    </InputGroup>
                    {updatedUser.username[0] === '@' &&
                      <FormHelperText color="red.300">Should not start with @</FormHelperText>
                    }
                    {updatedUser.username.split(" ").length > 1 &&
                      <FormHelperText color="red.300">Usernames should not contain spaces</FormHelperText>
                    }
                  </FormControl>
                </Box>
                :
                <Box>
                  <Spacer />
                  <Text>{username}</Text>
                </Box>
            }
          </HStack>

          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <HStack
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
              w="max-content"
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
                        ||
                        isSubmitting
                        ||
                        anyInvalid
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
                        setTitleEdit(false);
                        const newUser = updatedUser;
                        newUser.title = title ? title : "";
                        setUpdatedUser(Object.assign({ ...newUser }));
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
            </HStack>
            {loadingProfile ?
              (
                <Box>
                  <Spacer />
                  <Skeleton
                    isLoaded={!loadingProfile}
                  >
                    "Loading Profile..."
                  </Skeleton>
                </Box>
              )
              :
              titleEdit ?
                <Box>
                  <Spacer d={{ base: "none", lg: "flex" }} />
                  <Input
                    w="100%"
                    value={updatedUser.title}
                    placeholder={title || "Title"}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const newUser = updatedUser;
                      newUser.title = newTitle;
                      setUpdatedUser(Object.assign({ ...newUser }))
                    }}
                  />
                </Box>
                :
                title ?
                  (
                    <Box>
                      <Spacer />
                      <Text>{title}</Text>
                    </Box>
                  )
                  :
                  (
                    <Box>
                      <Spacer />
                      <Text>No title set</Text>
                    </Box>
                  )
            }
          </HStack>

          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <HStack
              spacing={{ base: 0, md: 1 }}
              alignItems="center"
              justifyContent="space-between"
              w="max-content"
            >
              {!websiteEdit &&
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
                    onClick={() => setWebsiteEdit(true)}
                    isLoading={loadingProfile}
                  >
                    <Icon
                      as={FaUserEdit}
                    />
                  </Button>
                )
              }
              {websiteEdit &&
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
                        updatedUser.website.length === 0
                        ||
                        updatedUser.website === website
                        ||
                        isSubmitting
                        ||
                        anyInvalid
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
                        setWebsiteEdit(false);
                        const newUser = updatedUser;
                        newUser.website = website ? website : "";
                        setUpdatedUser(Object.assign({ ...newUser }));
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
                Website:
              </Heading>
            </HStack>
            {loadingProfile ?
              <Box>
                <Spacer />
                <Skeleton
                  isLoaded={!loadingProfile}
                >
                  "Loading Profile..."
                </Skeleton>
              </Box>
              :
              websiteEdit ?
                <Box>
                  <Spacer d={{ base: "none", lg: "flex" }} />
                  <FormControl id="website">
                    <InputGroup>
                      <InputLeftAddon
                        // eslint-disable-next-line react/no-children-prop
                        children="https://"
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md"
                        p={{ base: 0.5, md: 4 }}
                      />
                      <Input
                        required
                        isInvalid={websiteInvalid}
                        type="url"
                        value={updatedUser.website}
                        placeholder={website || "plexuscreate.com"}
                        errorBorderColor="red.300"
                        id="website"
                        onChange={(e) => {
                          const newWebsite = e.target.value;
                          const newUser = updatedUser;
                          newUser.website = newWebsite;
                          setUpdatedUser(Object.assign({ ...newUser }))
                          if (newWebsite.match(/(http(s)?:\/\/)/) || (newWebsite.length >= 2 && !newWebsite.split(".")[1])) {
                            setWebsiteInvalid(true);
                          } else {
                            setWebsiteInvalid(false);
                          }
                        }}
                      />
                    </InputGroup>
                    {updatedUser.website.match(/(http(s)?:\/\/)/) &&
                      <FormHelperText color="red.300">Do not include "http://" or "https://"</FormHelperText>
                    }
                    {(website.length >= 2 && !website.split(".")[1]) &&
                      <FormHelperText color="red.300">Link should be valid</FormHelperText>
                    }
                  </FormControl>
                </Box>
                :
                website ?
                  <Box>
                    <Spacer />
                    <Text>{website}</Text>
                  </Box>
                  :
                  <Box>
                    <Spacer />
                    <Text>No Website Set</Text>
                  </Box>
            }
          </HStack>
        </VStack>
      </VStack >
      <Divider />
      <VStack
        w="100%"
        alignContent="center"
        align={["stretch", "center"]}
      >
        <VStack
          alignItems="center"
          width="100%"
        >
          <Heading>Bio</Heading>
          <Box
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
                    rows={10}
                    value={bio}
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
                          my={6}
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
                    ||
                    isSubmitting
                    ||
                    anyInvalid
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
                    const newUser = updatedUser;
                    newUser.bio = bio ? bio : "";
                    setUpdatedUser(Object.assign({ ...newUser }));
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
        </VStack>
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
  url: 'https://server-seven-blue.vercel.app/graphql',
}))(Profile);
