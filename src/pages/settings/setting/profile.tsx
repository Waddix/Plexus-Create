import { Box, Heading } from "@chakra-ui/react"
import React, { Fragment, useContext } from "react"
import { UserContext } from "../../../context/userContext"

const Profile = () => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  return (
    <Box>
      <Heading>{userProfile.name}'s Profile Settings</Heading>
    </Box>
  )
}

export default Profile;
