import {
  Box,
  Button,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"
import React from "react"
// import { UserContext } from "../../context/userContext"

const Theme = (): JSX.Element => {
  // User Profile Context
  // const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  // const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  // Color mode
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      textAlign="center"
      margin="auto"
    >
      <Button
        size="md"
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('orange.200', 'orange.700'),
        }}
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </Box>
  )
}

export default Theme;
