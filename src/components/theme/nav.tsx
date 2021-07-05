import React, { useContext } from 'react';
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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextAuth from '../auth/nextAuth';
import { useSession } from 'next-auth/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../context/userContext';

const Links = ['Home', 'Projects', 'Search'];

const NavLink = (link: string | JSX.Element): JSX.Element => (
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

const loggedOutIcon = (): JSX.Element => {
  return <FontAwesomeIcon icon={faUserCircle} size='2x' />
}

const searchIcon = (): JSX.Element => {
  return <FontAwesomeIcon icon={faSearch} size='1x' />
}

export default function Nav(): JSX.Element {
  // Session
  const [session] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  return (
    <nav>
      <Heading // Logo/App Name
        width='12rem'
        top='2'
        left={['0', '0', '3rem', '0']}
        right='0'
        marginLeft={['auto', 'auto', '0', 'auto']}
        marginRight='auto'
        position='absolute'
        d='flex'
        justifyContent='center'
        fontSize="3xl"
        _hover={{
          textDecoration: 'none',
          cursor: 'pointer',
          bg: useColorModeValue('orange.200', 'orange.700'),
        }}
      >
        Plexus Create
      </Heading>

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
              {searchIcon()}
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
                  cursor={'pointer'}>
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
                          <Icon as={loggedOutIcon} />
                      :
                      <Icon as={loggedOutIcon} />
                  }
                </Button>
              </PopoverTrigger>
              <NextAuth />
            </Popover>
          </Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                NavLink(link)
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </nav>
  );
}
