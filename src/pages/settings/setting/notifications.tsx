import { Box, Heading } from "@chakra-ui/react"
import React, { useContext } from "react"
import { UserContext } from "../../../context/userContext"

const Notifications = (): JSX.Element => {
  // User Profile Context
  const { userProfile } = useContext(UserContext)
  // Conditionally render the skeleton loading effects
  // const { loadingProfile, setLoadingProfile } = useContext(UserContext)

  return (
    <Box>
      <Heading>{userProfile.name}'s Notifications</Heading>
    </Box>
  )
}

export default Notifications;
