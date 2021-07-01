import React from "react";
import { Flex } from '@chakra-ui/react'
import { UserCard } from "../../components/UserCard";

function ProfileView() {
  return (
    <Flex
    justify={'center'}
    >
      <UserCard />
    </Flex>

  )
}

export default ProfileView;