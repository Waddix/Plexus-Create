import React, { Fragment, useContext, useEffect, useRef } from 'react'
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
  useColorMode
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useGetUserQuery, useGetProfileUserIdQuery, useCreateProfileForUserMutation } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { UserContext } from '../../context/userContext';

const UserLinks = ['Profile'];

const PopoverLink = (link: string): JSX.Element => (
  <Link
    key={link}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('orange.200', 'orange.700'),
    }}
    href={`/${link.toLowerCase()}`}
  >
    {link}
  </Link>
);

export const loggedOutIcon = (): JSX.Element => {
  return <FontAwesomeIcon icon={faUserCircle} size='3x' />
}

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
const NextAuth: React.FC<{}> = ({ }) => {
  const [session] = useSession();
  const user = session ? session.user : { name: "", email: "", image: "" };

  const name = user?.name || "";
  const email = user?.email || "";
  const image = user?.image || "";

  const { colorMode, toggleColorMode } = useColorMode();

  const [userResult] = useGetUserQuery({ variables: { name: name, email: email } });
  const { data: userData, fetching: userFetching, error: userError } = userResult;

  const userId = useRef(0)

  const [profileResult, refetch] = useGetProfileUserIdQuery({ variables: { user_id: userId.current } });
  const { data: profileData, fetching: profileFetching, error: profileError } = profileResult;

  const { userProfile, setUserProfile } = useContext(UserContext)

  const [, createProfile] = useCreateProfileForUserMutation();

  // Getting userId from database and setting it ot a useRef
  useEffect(() => {
    if (session) {
      if (userFetching === false) {
        const user = userData?.findUser;
        if (user) {
          userId.current = Number(user.id);
          refetch();
        }
      }
      // Check if this user has a profile linked to the db

      // const {data: userByName}  = useGetUserNameQuery({variables: {name: name}});

      // If the user has a profile in the db, set it to the account/user/profile context and return true

      /**
       * If the user does not have a profile in the db, create their profile in the database, set it to the context,
       * then return true and a way to signify it is a new profile so that the register-flow can be triggered.
       */

      // If there is a conflict finding or creating the profile return false.
    }
  }, [refetch, session, userData?.findUser, userFetching])

  useEffect(() => {
    if (profileFetching === false && userId.current !== 0) {
      const profile = profileData?.findProfileUserId;
      if (profile) {
        const newVals = { user_id: userId.current, email: email };
        const newProfile = { ...profile, ...newVals };
        setUserProfile(newProfile);
      } else if ((profile === undefined || profile === null) && profileFetching === false) {
        const values = {
          id: 1,
          user_id: userId.current,
          name: name,
          username: '@' + email.split('@')[0],
          email: email,
          image: image,
          title: `${name}'s awesome title`,
          bio: `${name}'s awesome bio`,
          website: 'http://example.com/'
        }
        createProfile({ input: values })
          .then(() => refetch());
      }
    }
  }, [createProfile, email, image, name, profileData?.findProfileUserId, profileFetching, refetch, setUserProfile])

  return (
    <PopoverContent marginRight={'0.3rem'} bg={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('orange.200', 'orange.700')}>
      <Fragment>
        <PopoverHeader>
          {session ?
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              {/* {console.log(session)} */}
              <Box justifyContent="flex-start">
                <p><small>Signed in as</small></p>
                <p><strong>{userProfile.username || userProfile.name || userProfile.email}</strong></p>
              </Box>
              <Box justifyContent="flex-end">
                {userProfile.image ?
                  <Avatar
                    name={userProfile.name}
                    size={'md'}
                    src={userProfile.image}
                  />
                  :
                  <Icon as={loggedOutIcon} />}
              </Box>
            </Flex>
            :
            <Flex alignItems={'center'} justifyContent={'space-between'} >
              <Box>
                <p><strong>{"You're not signed in"}</strong></p>
              </Box>
              <Box>
                <Icon as={loggedOutIcon} />
              </Box>
            </Flex>
          }
        </PopoverHeader>
        <PopoverBody>
          {session ?
            <Fragment>
              {UserLinks.map((link) => (
                PopoverLink(link)
              ))}
            </Fragment>
            :
            null
          }
          <Button
            size="sm"
            rounded={'md'}
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('orange.200', 'orange.700'),
            }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </PopoverBody>
        <PopoverFooter>
          {session ?
            <Button
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.200', 'orange.700'),
              }}
            >
              Sign Out
            </Button>
            :
            <Link
              px={2}
              py={1}
              rounded={'md'}
              href={`/api/auth/signin`}
            >
              <Button
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
              >
                Sign In
              </Button>
            </Link>
          }
          <Flex>
            <Link
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: 'orange', // useColorMode hook inside conditional render throws errors
              }}
              href={`/create-project`}
            >
              New Project
            </Link>
          </Flex>
        </PopoverFooter>
      </Fragment>
    </PopoverContent>
  )
}

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(NextAuth);
