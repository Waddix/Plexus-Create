import React, { Fragment, useContext } from "react";
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

interface NameProps {
  name: string,
  updateName: React.Dispatch<React.SetStateAction<string>>,
  username: string,
  updateUsername: React.Dispatch<React.SetStateAction<string>>,
  title: string,
  updateTitle: React.Dispatch<React.SetStateAction<string>>,
  bio: string,
  updateBio: React.Dispatch<React.SetStateAction<string>>,
  space: boolean,
  updateSpace: React.Dispatch<React.SetStateAction<boolean>>,
  at: boolean
  updateAt: React.Dispatch<React.SetStateAction<boolean>>,
  website: string,
  updateWebsite: React.Dispatch<React.SetStateAction<string>>,
  invalidateWebsite: React.Dispatch<React.SetStateAction<boolean>>,
  invalidWebsite: boolean,
}

function Name({
  name,
  updateName,
  username,
  updateUsername,
  title,
  updateTitle,
  bio,
  updateBio,
  space,
  updateSpace,
  at,
  updateAt,
  updateWebsite,
  website,
  invalidateWebsite,
  invalidWebsite,
}: NameProps): JSX.Element {

  // User Profile
  const { userProfile } = useContext(UserContext)

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
            id="name"
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
              // eslint-disable-next-line react/no-children-prop
              children="@"
              bg={useColorModeValue("gray.50", "gray.800")}
              color={useColorModeValue("gray.500", "gay.50")}
              rounded="md"
            />
            <Input
              required
              validationMessage="Should not start with @"
              isInvalid={at || space}
              value={username}
              onChange={(e) => {
                updateUsername(e.target.value)

                if (e.target.value[0] === '@') {
                  updateAt(true);
                } else if (e.target.value[0] !== '@') {
                  updateAt(false);
                }

                if (e.target.value.split(" ").length > 1) {
                  updateSpace(true);
                } else if (e.target.value.split(" ").length === 1) {
                  updateSpace(false);
                }
              }}
              id="username"
              placeholder={username || "Username"}
              errorBorderColor="red.300"
            />
          </InputGroup>
          {at &&
            <FormHelperText color="red.300">Should not start with @</FormHelperText>
          }
          {space &&
            <FormHelperText color="red.300">Usernames cannot contain spaces</FormHelperText>
          }
        </FormControl>
      </Box>
      <Box mt={7}>
        <FormLabel htmlFor="title">Your Title</FormLabel>
        <Input value={title}
          onChange={(e) => updateTitle(e.target.value)}
          id="title"
          placeholder={"Web Developer | Artist | Graphic Designer"}
        />
      </Box>
      <Box mt={7}>
        <FormLabel htmlFor="title">Your Website</FormLabel>
        <FormControl id="website">
          <InputGroup>
            <InputLeftAddon
              // eslint-disable-next-line react/no-children-prop
              children="https://"
              bg={useColorModeValue("gray.50", "gray.800")}
              color={useColorModeValue("gray.500", "gay.50")}
              rounded="md"
            />
            <Input
              required
              isInvalid={invalidWebsite}
              type="url"
              value={website}
              placeholder={"plexuscreate.com"}
              errorBorderColor="red.300"
              id="website"
              onChange={(e) => {
                const website = e.target.value;
                updateWebsite(website)
                if (website.match(/(http(s)?:\/\/)/) || (website.length >= 2 && !website.split(".")[1])) {
                  invalidateWebsite(true);
                } else {
                  invalidateWebsite(false);
                }
              }}
            />
          </InputGroup>
          {website.match(/(http(s)?:\/\/)/) &&
            <FormHelperText color="red.300">Do not include "http://" or "https://"</FormHelperText>
          }
          {(website.length >= 2 && !website.split(".")[1]) &&
            <FormHelperText color="red.300">Link should be valid</FormHelperText>
          }
        </FormControl>
      </Box>
      <Box mt={7}>
        <FormLabel htmlFor="bio">Your Bio</FormLabel>
        <Textarea
          value={bio}
          onChange={(e) => updateBio(e.target.value)}
          id="bio"
          placeholder={"Write something about yourself"}
        />
      </Box>
    </Fragment >
  )
}

export default Name;