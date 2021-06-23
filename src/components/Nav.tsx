/* eslint-disable react/react-in-jsx-scope */
import { useColorMode, Switch, Flex, Button, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [display, changeDisplay] = useState('none')

  return (
    <Flex>
      <Flex
        pos="fixed"
        top="1rem"
        right="1rem"
        align="center"
      >
        <Flex
          display={['none', 'none', 'flex', 'flex']}
        >
          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Home
            </Button>
          </NextLink>

          <NextLink href="/projects" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Projects
            </Button>
          </NextLink>

          <NextLink href="/profile" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Profile
            </Button>
          </NextLink>
        </Flex>

        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          display={['flex', 'flex', 'none', 'none']}
          onClick={() => changeDisplay('flex')}
        />

        <Switch
          color="green"
          isChecked={isDark}
          onChange={toggleColorMode}
        />
      </Flex>
      {/* mobile/hamburger menu    */}
      <Flex
        width="100%"
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        display={display}
      >
        <Flex justify="flex-end">
          <IconButton
          mt={2}
          mr={2}
          aria-label="Close Menu"
          size="lg"
          icon={
            <CloseIcon />
          }
          onClick={() => changeDisplay('none')}
          />
        </Flex>
        <Flex
          flexDir="column"
          align="center"

        >
          <NextLink href="/" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Home
            </Button>
          </NextLink>

          <NextLink href="/projects" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Projects
            </Button>
          </NextLink>

          <NextLink href="/profile" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Home"
              my={5}
              w="100%"
            >
              Profile
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>


  )
}