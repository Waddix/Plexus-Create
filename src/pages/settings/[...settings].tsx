import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
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
import Profile from "./setting/profile";
import Following from './setting/following'
import Notifications from "./setting/notifications";
import Accessibility from "./setting/Accessibility";
import Theme from "./setting/theme";

const Settings = (): JSX.Element => {
  const router = useRouter();
  const { settings } = router.query;

  const sidebar = useDisclosure();

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
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
        {...rest}
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

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      zIndex="sticky"
      h="93vh"
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
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Settings Navigation"
      >
        <Link
          href='/settings/profile'
        >
          <NavItem icon={FaUser}>Profile</NavItem>
        </Link>
        <Link
          href='/settings/following'
        >
          <NavItem icon={FaUsers}>Following</NavItem>
        </Link>
        <Link
          href='/settings/notifications'
        >
          <NavItem icon={FaBell}>Notifications</NavItem>
        </Link>
        <Link href='/settings/accessibility'>
          <NavItem icon={FaUniversalAccess}>Accessibility</NavItem>
        </Link>
        <Link href='/settings/theme'>
          <NavItem icon={FaSwatchbook}>Theme</NavItem>
        </Link>
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Box as="main" p="4">
          {(settings && settings.length > 0) &&
            settings[0] === 'profile' &&
            <Profile />
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
