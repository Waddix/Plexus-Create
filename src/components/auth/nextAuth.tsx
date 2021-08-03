/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  useColorModeValue,
  Icon,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useColorMode,
  Skeleton,
  SkeletonCircle,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import {
  useGetUserQuery,
  useGetProfileUserIdQuery,
  useCreateProfileForUserMutation,
} from "../../generated/graphql";
import { NextComponentType, withUrqlClient } from "next-urql";
import { UserContext } from "../../context/userContext";
import RegisterFlow from "./RegisterFlow";
import { FaUserCircle, FaCog } from "react-icons/fa";

const UserLinks = ["Profile"];

const PopoverLink = (link: string): JSX.Element => (
  <Link
    key={link}
    rounded={"md"}
    py={1}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("orange.200", "orange.700"),
    }}
    href={`/${link.toLowerCase()}`}
    w="100%"
    textAlign="center"
  >
    {link}
  </Link>
);

const NextAuth: NextComponentType = ({ pageProps }) => {
  // Next auth session
  const [session] = useSession();
  // User from next auth session
  const user = session ? session.user : { name: "", email: "", image: "" };

  // Grab props from user in the session or use empty strings
  const name = user?.name || "";
  const email = user?.email || "";
  const image = user?.image || "";

  // Color mode
  const { colorMode, toggleColorMode } = useColorMode();

  // Get users
  const [userResult] = useGetUserQuery({
    variables: { name: name, email: email },
  });
  const { data: userData, fetching: userFetching } = userResult;

  // User id from the queried user
  const userId = useRef(0);

  // Get user's profile
  const [profileResult, refetch] = useGetProfileUserIdQuery({
    variables: { user_id: userId.current },
  });
  const {
    data: profileData,
    fetching: profileFetching,
    error: profileError,
  } = profileResult;

  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext);

  // User profile
  const { userProfile, setUserProfile } = useContext(UserContext);

  // Create profile mutation
  const [, createProfile] = useCreateProfileForUserMutation();

  // Getting userId from database and setting it to a useRef
  useEffect(() => {
    if (session) {
      if (userFetching === false) {
        const user = userData?.findUser;
        if (user) {
          userId.current = Number(user.id);
          refetch();
        }
      }
    }
  }, [refetch, session, userData?.findUser, userFetching]);

  // User registration
  const { newUser, setNewUser } = useContext(UserContext);

  const [failAlert, setFailAlert] = useState<boolean>(false);

  // Getting user's profile from the database and setting it to context or creating a profile for them and re-fetching the profile with fresh data
  useEffect(() => {
    if (profileFetching === true) {
      setLoadingProfile(true);
    }

    if (profileFetching === false && userId.current !== 0) {
      const profile = profileData?.findProfileUserId;
      if (profile) {
        // There is a bug with join tables in GraphQL. Using the user id and email from the sessions for now.
        const newVals = { user_id: userId.current, email: email };
        const newProfile = { ...profile, ...newVals };
        setUserProfile(newProfile);
        setLoadingProfile(false);
      } else if (
        (profile === undefined || profile === null) &&
        profileFetching === false
      ) {
        setLoadingProfile(false);
        setNewUser(true);
        const values = {
          id: userId.current,
          user_id: userId.current,
          name: name,
          username: "@" + email.split("@")[0],
          email: email,
          image: image,
          title: "",
          bio: "",
          website: "",
        };
        createProfile({ input: values }).then(() => refetch());
      }
    }

    // if (profileError && !profileError.message.split(" ").includes("null")) {
    //   console.warn("Error loading profile!");
    //   setFailAlert(true);
    //   setLoadingProfile(false);
    // }
  }, [
    createProfile,
    email,
    image,
    name,
    profileData?.findProfileUserId,
    profileError,
    profileFetching,
    refetch,
    setLoadingProfile,
    setNewUser,
    setUserProfile,
  ]);

  useEffect(() => {
    if (newUser || !newUser) {
      refetch();
    }
  }, [newUser, refetch]);

  return (
    <Fragment>
      {/* {failAlert && (
        <HStack
          h={["6rem", "4rem", "4rem", "4rem"]}
          position="absolute"
          left="0"
          top="0"
          zIndex="banner"
        >
          <Alert d="flex" w="100vw" h="100%" status="error" variant="solid">
            <AlertIcon />
            <AlertTitle mr={2}>Failed to fetch your profile</AlertTitle>
            <AlertDescription>
              Please refresh the page or try logging in again.
            </AlertDescription>
            <CloseButton
              position={["unset", "absolute", "absolute", "absolute"]}
              right="2rem"
              my="auto"
              onClick={() => setFailAlert(false)}
            />
          </Alert>
        </HStack>
      )} */}
      <PopoverContent
        zIndex="popover"
        mt="0.87rem"
        mr="0.3rem"
        bg={useColorModeValue("gray.100", "gray.900")}
        borderColor={useColorModeValue("orange.200", "orange.700")}
      >
        <Fragment>
          <PopoverHeader>
            {session ? (
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                {loadingProfile ? (
                  <Box justifyContent="flex-start">
                    <Text fontSize="sm">Signed in as</Text>
                    <Skeleton height="16px" />
                  </Box>
                ) : (
                  <Box justifyContent="flex-start" width="100%">
                    <Text fontSize="sm">Signed in as</Text>
                    <Heading size="md">
                      {userProfile.username || "Failed getting profile"}
                    </Heading>
                  </Box>
                )}
                <Box justifyContent="flex-end">
                  {loadingProfile ? (
                    <SkeletonCircle size="3rem" />
                  ) : userProfile.image ? (
                    <Avatar
                      name={userProfile.name}
                      size={"md"}
                      src={userProfile.image}
                    />
                  ) : (
                    <Icon boxSize={10} as={FaUserCircle} />
                  )}
                </Box>
              </Flex>
            ) : (
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Heading size="md">You're not signed in</Heading>
                </Box>
                <Box>
                  <Icon boxSize={10} as={FaUserCircle} />
                </Box>
              </Flex>
            )}
          </PopoverHeader>
          {session && (
            <PopoverBody>
              <VStack mx={2}>
                {UserLinks.map((link) => {
                  if (loadingProfile) {
                    return <Skeleton height="30px" />;
                  } else {
                    return PopoverLink(link);
                  }
                })}
              </VStack>
            </PopoverBody>
          )}

          <PopoverFooter>
            <Flex justifyContent="space-between">
              <VStack w="100%" alignItems="stretch" mx={2}>
                {session ? (
                  <Fragment>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                      _hover={{
                        textDecoration: "none",
                        bg: useColorModeValue("orange.200", "orange.700"),
                      }}
                    >
                      Sign Out
                    </Button>
                    <Link rounded={"md"} href={`/create-project`}>
                      <Button
                        _hover={{
                          textDecoration: "none",
                          bg: useColorModeValue("orange.200", "orange.700"),
                        }}
                      >
                        Create Project
                      </Button>
                    </Link>
                  </Fragment>
                ) : (
                  <Link rounded={"md"} href={`/api/auth/signin`}>
                    <Button
                      w="100%"
                      _hover={{
                        textDecoration: "none",
                        bg: useColorModeValue("orange.200", "orange.700"),
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </VStack>

              <VStack w="100%" alignItems="stretch" mx={2}>
                <Button
                  size="md"
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("orange.200", "orange.700"),
                  }}
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                </Button>
                <Box d="inline-flex" justifyContent="end">
                  {session && (
                    <Link rounded={"md"} href={`/settings/profile`}>
                      <Button
                        _hover={{
                          textDecoration: "none",
                          bg: useColorModeValue("orange.200", "orange.700"),
                        }}
                        variant="ghost"
                      >
                        <Icon size={8} as={FaCog} />
                      </Button>
                    </Link>
                  )}
                </Box>
              </VStack>
            </Flex>
          </PopoverFooter>
        </Fragment>
      </PopoverContent>

      <RegisterFlow pageProps={pageProps} />
    </Fragment>
  );
};

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(NextAuth);
