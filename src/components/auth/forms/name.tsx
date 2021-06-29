import React, { Fragment, useContext } from "react";
import { FormLabel, Input, Box, Textarea, InputLeftAddon, useColorModeValue, InputGroup } from '@chakra-ui/react';
import { UserContext } from "../../../context/userContext";

export default function Name({ name, updateName, username, updateUsername, updateTitle, updateBio }): JSX.Element {

  // User Profile
  const { userProfile, setUserProfile } = useContext(UserContext)

  return (
    <Fragment>
      <Box>
        <FormLabel htmlFor="name">Display Name</FormLabel>
        <Input required value={name} onChange={(e) => updateName(e.target.value)} id="name" placeholder={userProfile.name || "Display Name"} />
      </Box>
      <Box mt={7}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <InputGroup>
          <InputLeftAddon
            children="@"
            bg={useColorModeValue("gray.50", "gray.800")}
            color={useColorModeValue("gray.500", "gay.50")}
            rounded="md"
          />
          <Input required value={username} onChange={(e) => updateUsername(e.target.value)} id="username" placeholder={username || "Display Name"} />
        </InputGroup>
      </Box>
      <Box mt={7}>
        <FormLabel htmlFor="title">Your Title</FormLabel>
        <Input onChange={(e) => updateTitle(e.target.value)} id="title" placeholder={"Fullstack Web Developer"} />
      </Box>
      <Box mt={7}>
        <FormLabel htmlFor="bio">Your Bio</FormLabel>
        <Textarea onChange={(e) => updateBio(e.target.value)} id="bio" placeholder={"Write something about yourself"} />
      </Box>
    </Fragment >
  )
}