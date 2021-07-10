import React, { Fragment } from "react";
import {  Heading, } from '@chakra-ui/react';
// import { UserContext } from "../../../context/userContext";

export default function Settings(): JSX.Element {

  // const { userProfile } = useContext(UserContext);

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