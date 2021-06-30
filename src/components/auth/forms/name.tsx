import React, { Fragment, useContext, useState } from "react";
import {
  FormLabel,
  Input,
  Box,
  Textarea,
  InputLeftAddon,
  useColorModeValue,
  InputGroup,
  FormControl,
  FormHelperText
} from '@chakra-ui/react';
import { UserContext } from "../../../context/userContext";

export default function Name({ name, updateName, username, updateUsername, updateTitle, updateBio }): JSX.Element {

  // User Profile
  const { userProfile, setUserProfile } = useContext(UserContext)

  const [userNameInvalid, setUsernameInvalid] = useState(false);

  return (
    <Fragment>
      <Box>
        <FormControl id="name" isRequired>
          <FormLabel htmlFor="name">Display Name</FormLabel>
          <Input
            required
            isInvalid={name.length > 0 ? false : true}
            value={name}
            onChange={(e) => updateName(e.target.value)}
            d="name"
            placeholder={userProfile.name || "Display Name"}
            errorBorderColor="red.300"
          />
        </FormControl>
      </Box>
      <Box mt={7}>
        <FormControl id="username" isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <InputGroup>
            <InputLeftAddon
              children="@"
              bg={useColorModeValue("gray.50", "gray.800")}
              color={useColorModeValue("gray.500", "gay.50")}
              rounded="md"
            />
            <Input
              required
              validationMessage="Should not start with @"
              isInvalid={userNameInvalid}
              value={username}
              onChange={(e) => {
                updateUsername(e.target.value)

                if (e.target.value[0] === '@') {
                  setUsernameInvalid(true);
                } else if (e.target.value[0] !== '@') {
                  setUsernameInvalid(false);
                }
              }}
              id="username"
              placeholder={username || "Display Name"}
              errorBorderColor="red.300"
            />
          </InputGroup>
          {userNameInvalid &&
            <FormHelperText color="red.300">Should not start with @</FormHelperText>
          }
        </FormControl>
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