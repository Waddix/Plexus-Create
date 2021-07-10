/* eslint-disable react-hooks/rules-of-hooks */
import {
  As,
  Box,
  ChakraProps,
  Flex,
  HStack,
  Icon,
  Link,
  OmitCommonProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  FaUser,
  FaUsers,
  FaBell,
  FaUniversalAccess,
  FaSwatchbook,
} from "react-icons/fa";
import Profile from "../../components/setting/profile";
import Following from '../../components/setting/following'
import Notifications from "../../components/setting/notifications";
import Accessibility from "../../components/setting/accessibility";
import Theme from "../../components/setting/theme";
import type { AppProps } from 'next/app'

const Settings = ({ pageProps }: AppProps): JSX.Element => {
  // Be able to tell which settings is being accessed
  const router = useRouter();
  const { settings } = router.query;

  // Nav items
  const NavItem = ({ children, icon }) => {
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: useColorModeValue("gray.600", "gray.300"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  // Sidebar
  const SidebarContent = (props: JSX.IntrinsicAttributes & OmitCommonProps<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof ChakraProps> & ChakraProps & OmitCommonProps<unknown, keyof ChakraProps> & { as?: As<unknown> | undefined; }) => (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      zIndex="0"
      h="100vh"
      bottom="0"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex
        mt="64px"
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Settings Navigation"
      >
        <Link
          href='/settings/profile'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <NavItem icon={FaUser}>Profile</NavItem>
        </Link>
        {/* <Link
          href='/settings/following'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <NavItem icon={FaUsers}>Following</NavItem>
        </Link>
        <Link
          href='/settings/notifications'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <NavItem icon={FaBell}>Notifications</NavItem>
        </Link>
        <Link
          href='/settings/accessibility'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <NavItem icon={FaUniversalAccess}>Accessibility</NavItem>
        </Link> */}
        <Link
          href='/settings/theme'
          _hover={{
            textDecoration: 'none',
          }}
        >
          <NavItem icon={FaSwatchbook}>Theme</NavItem>
        </Link>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
    // minH="93.1vh"
    >
      <SidebarContent
        display={{ base: "none", md: "unset" }}
      />

      <HStack
        display={{ base: "unset", md: "none" }}
        position="sticky"
        top='4rem'
      >
        <Flex
          direction="row"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Settings Navigation"
          overflowX="auto"
          bg={useColorModeValue("gray.50", "gray.700")}
          justifyContent="center"
          alignContent="center"
        >
          <Link
            href='/settings/profile'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <NavItem icon={FaUser}>Profile</NavItem>
          </Link>
          {/* <Link
            href='/settings/following'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <NavItem icon={FaUsers}>Following</NavItem>
          </Link>
          <Link
            href='/settings/notifications'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <NavItem icon={FaBell}>Notifications</NavItem>
          </Link>
          <Link
            href='/settings/accessibility'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <NavItem icon={FaUniversalAccess}>Accessibility</NavItem>
          </Link> */}
          <Link
            href='/settings/theme'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <NavItem icon={FaSwatchbook}>Theme</NavItem>
          </Link>
        </Flex>
      </HStack>

      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Box as="main" p="4">
          {(settings && settings.length > 0) &&
            settings[0] === 'profile' &&
            <Profile pageProps={pageProps} />
          }
          {(settings && settings.length > 0) &&
            settings[0] === 'following' &&
            <Following />
          }
          {(settings && settings.length > 0) &&
            settings[0] === 'notifications' &&
            <Notifications />
          }
          {(settings && settings.length > 0) &&
            settings[0] === 'accessibility' &&
            <Accessibility />
          }
          {(settings && settings.length > 0) &&
            settings[0] === 'theme' &&
            <Theme />
          }
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
