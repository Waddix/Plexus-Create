import React, { Fragment, useContext } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  Spacer,
  SkeletonCircle,
  Heading,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextAuth from '../auth/nextAuth';
import { useSession } from 'next-auth/client';
import { UserContext } from '../../context/userContext';
import { FaUserCircle, FaSearch } from "react-icons/fa";
import type { AppProps } from 'next/app'

const Links = ['Home', 'Projects', 'Search'];

const NavLink = (link: string): JSX.Element => (
  <Link
    key={link}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('orange.200', 'orange.700'),
    }}
    href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
  >
    {link}
  </Link>
);

function Nav(pageProps: AppProps): JSX.Element {
  // Session
  const [session] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile } = useContext(UserContext)

  return (
    <Fragment>

      <Box
        zIndex="sticky"
        as="nav"
        w="100 vw"
        position="sticky"
        top='0'
        alignItems={'center'}
      >
        <Flex
          width={{ base: "100%", md: "auto", lg: "100%" }}
          justifyContent={["center", "center", "start", "center"]}
          height="0"
          mx={["auto", "auto", "inherit", "auto"]}
          ml={["0px", "0px", "12px", "0px"]}
          top='0.7rem'
          position='absolute'
          transition=".3s ease"
        >
          <Heading // Logo/App Name
            fontSize="3xl"
            _hover={{
              textDecoration: 'none',
              cursor: 'pointer',
              bg: useColorModeValue('orange.200', 'orange.700'),
            }}
          >
            Plexus Create
          </Heading>
        </Flex>

        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Spacer />
            <HStack spacing={8} alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => {
                  if (link !== 'Search') {
                    return NavLink(link)
                  }
                })}
              </HStack>
            </HStack>
            <Box display={{ base: 'none', md: 'flex' }} marginLeft='0.5rem'>
              <Link
                key="search"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('orange.200', 'orange.700'),
                }}
                href="/search"
              >
                <Icon as={FaSearch} />
              </Link>
            </Box>
            <Box marginLeft='0.5rem' alignItems={'center'}>
              <Popover
                placement="bottom"
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Button
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                  >
                    {
                      session ?
                        loadingProfile ?
                          <SkeletonCircle size="2rem" />
                          :
                          userProfile.image ?
                            <Avatar
                              name={userProfile.name}
                              size={'sm'}
                              src={userProfile.image}
                            />
                            :
                            <Icon boxSize={8} as={FaUserCircle} />
                        :
                        <Icon boxSize={8} as={FaUserCircle} />
                    }
                  </Button>
                </PopoverTrigger>
                <NextAuth {...pageProps} />
              </Popover>
            </Box>
          </Flex>


          <Collapse
            in={isOpen}
            animateOpacity
          >
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  NavLink(link)
                ))}
              </Stack>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Fragment>
  );
}

export default Nav;