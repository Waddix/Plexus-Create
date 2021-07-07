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
  Icon
} from "@chakra-ui/react"
import React, { Fragment, useContext } from "react"
import { JsxEmit } from "typescript"
import { UserContext } from "../../../context/userContext"
import { FaUserEdit } from "react-icons/fa";

const Profile = (): JSX.Element => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  const handleImageUpload = () => {
    return;
  }

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          textAlign="center"
        >
          <Avatar
            name="userProfile.name"
            src={userProfile.image}
            size="xl"
          />
          <form onSubmit={handleImageUpload}>
            <chakra.label
              for="image"
              cursor="pointer"
              rounded="md"
              fontSize="md"
              pos="relative"
            >
              <Fragment>
                <FormLabel
                  htmlFor="image"
                  bg="whiteAlpha.200"
                  rounded="md"
                  px={2}
                  py={2}
                  mt={4}
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

        <Box>
          <VStack
            alignItems="left"
            spacing={8}
            width='max-content'
          >
            <Flex
              flexDirection="row"
              justifyContent="start"
              alignContent="center"
            >
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
              >
                <Icon
                  as={FaUserEdit}
                />
              </Button>
              <Heading size="md">
                Name:
              </Heading>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="start"
              alignContent="center"
            >
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
              >
                <Icon
                  as={FaUserEdit}
                />
              </Button>
              <Heading size="md">
                Username:
              </Heading>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="start"
              alignContent="center"
            >
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
              >
                <Icon
                  as={FaUserEdit}
                />
              </Button>
              <Heading size="md">
                Title:
              </Heading>
            </Flex>
          </VStack>
        </Box>

        <Box>
          <VStack
            alignItems="end"
            width='max-content'
            spacing={8}
          >
            <Text>
              {userProfile.name}
            </Text>
            <Text>
              {userProfile.username}
            </Text>
            <Text>
              {userProfile.title || "No title set"}
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default Profile;
