import React from 'react';
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
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextAuth from './nextAuth';
import { useSession } from 'next-auth/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Links = ['Home', 'Projects'];

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

const loggedOutIcon = (): JSX.Element => {
  return <FontAwesomeIcon icon={faUserCircle} size='2x' />
}

export default function Nav(): JSX.Element {
  const [session] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <nav>
      <Text
        width='12rem'
        top='2'
        left='0'
        right='0'
        marginLeft='auto'
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
      </Text>
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
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                NavLink(link)
              ))}
            </HStack>
          </HStack>
          <Box marginLeft='2rem' alignItems={'center'}>
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
                      session.user.image ?
                        <Avatar
                          name={session.user.name}
                          size={'sm'}
                          src={session.user.image}
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
