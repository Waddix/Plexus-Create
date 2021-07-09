import { Box, Heading } from "@chakra-ui/react"
import React, { Fragment, useContext } from "react"
import { UserContext } from "../../../context/userContext"

const Following = () => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  return (
    <Box>
      <Heading>{userProfile.name}'s Following</Heading>
    </Box>
  )
}

export default Following;
