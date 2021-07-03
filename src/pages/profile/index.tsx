import React, { useContext } from "react";
import { Flex } from '@chakra-ui/react'
import { UserCard } from "../../components/UserCard";
import { UserContext } from "../../context/userContext";

function ProfileView() {
  // const { projectsFollowing } = useContext(UserContext);

  return (
    <Flex
    justify={'center'}
    >
      <UserCard />
    </Flex>

  )
}

export default ProfileView;