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
  HStack,
  Divider
} from "@chakra-ui/react"
import React, { Fragment, useContext } from "react"
import { JsxEmit } from "typescript"
import { UserContext } from "../../../context/userContext"
import { FaUserEdit, FaEdit } from "react-icons/fa";

const Profile = (): JSX.Element => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  const handleImageUpload = () => {
    return;
  }

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
          <Spacer />
          <VStack
            alignItems="end"
            // width='max-content'
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
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
      <VStack
        w="100%"
        alignContent="center"
        align={["stretch", "center"]}
      >
        <Flex
          alignItems="center"
          flexDirection="column"
        >
          <Heading>Bio</Heading>
          <Box
            my={4}
            width="100%"
          >
            <Box
              width="max-content"
            >
              {userProfile.bio ?
                userProfile.bio.map((line: string) => {
                  return (
                    <Text
                      key={line.replace(" ", "-")}
                    >
                      {line}
                    </Text>
                  )
                })
                :
                (
                  <Text>No bio set</Text>
                )
              }
            </Box>
          </Box>
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
          >
            <Icon
              as={FaEdit}
            />
          </Button>
        </Flex>
      </VStack>
    </VStack>
  )
}

export default Profile;
