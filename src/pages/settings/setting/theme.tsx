import { Box, Heading } from "@chakra-ui/react"
import React, { Fragment, useContext } from "react"
import { UserContext } from "../../../context/userContext"

const Theme = () => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  return (
    <Box>
      <Heading>{userProfile.name}'s Theme</Heading>
    </Box>
  )
}

export default Theme;
