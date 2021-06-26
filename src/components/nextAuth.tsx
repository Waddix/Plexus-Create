import React, { Fragment } from 'react'
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
import {FcPlus} from 'react-icons/fc'
import { SimpleConsoleLogger } from 'typeorm';

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
export default function NextAuth(): JSX.Element {
  const [session] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(session);

  return (
    <PopoverContent marginRight={'0.3rem'} bg={useColorModeValue('gray.100', 'gray.900')} borderColor={useColorModeValue('orange.200', 'orange.700')}>
      <Fragment>
        <PopoverHeader>
          {session ?
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Box justifyContent="flex-start">
                <p><small>Signed in as</small></p>
                <p><strong>{session.user.email || session.user.name}</strong></p>
                {console.log(session.user)}
              </Box>
              <Box justifyContent="flex-end">
                {session.user.image ?
                  <Avatar
                    name={session.user.name}
                    size={'md'}
                    src={session.user.image}
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
