import React, { Fragment, useContext } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Textarea, Heading, Button, useColorModeValue, Flex, Spacer } from '@chakra-ui/react';
import { Field, Form, } from "formik";
import { UserContext } from "../../../context/userContext";

export default function Settings(): JSX.Element {

  const { userProfile } = useContext(UserContext);

  return (
    <Fragment>
      <Heading
        textAlign='center'
      >
        Setting will be displayed here
      </Heading>
    </Fragment >
  )
}