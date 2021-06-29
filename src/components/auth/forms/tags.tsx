import React, { Fragment, useContext } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Textarea, Heading } from '@chakra-ui/react';
import { Field, Form, } from "formik";
import { UserContext } from "../../../context/userContext";

export default function Tags(): JSX.Element {

  const { userProfile } = useContext(UserContext);

  return (
    <Fragment>
      <Heading
        textAlign='center'
      >
        Tags will be displayed here
      </Heading>
    </Fragment >
  )
}