import {
  Box,
  Heading
} from "@chakra-ui/layout";
import React, { useContext } from "react";
import DTProfileCard from "../cards/desktop/DTProfileCard";
import { UserContext } from "../../context/userContext";
import { VStack } from "@chakra-ui/react";
import MBProfileCard from "../cards/mobile/MBProfileCard";
import DTProjectCard from "../cards/desktop/DTProjectCard";
import { title } from "process";
import MBProjectCard from "../cards/mobile/MBProjectCard";

const NewFeed = (): JSX.Element => {
  const profile = useContext(UserContext);
  const { userProfile } = profile;
  return (
    <Box
      w={["100%", "100%", "90%", "80%"]}
      mx="auto"
      mt={6}
      mb="auto"
      textAlign="center"
    >
      <VStack
        d={{ base: "flex", md: "none" }}
        m="auto"
        w="100%"
      >
        <Heading>Mobile View!</Heading>
        <MBProfileCard profile={userProfile} />
        <MBProjectCard project={{
          title: "Minnesota Coalition For Youth Justice",
          description: "We work as a collective of community members, youth, and families working together envision and create a new juvenile justice system. Our organizational partners include the Legal Rights Center, the University of Minnesota Law School, The Link, ACLU-Minnesota, Project for Pride in Living, Until We Are All Free, Minnesota Alliance with Youth, Youthprise, Minneapolis Youth Coordinating Board, St. Paul Youth Services, N4 and NAACP-Minneapolis, among others.",
          image: "https://res.cloudinary.com/plexus-create/image/upload/v1626101249/projects/bidcuvrkhvqshwqvqktz.png",
          id: 4,
          tags: ["Social Justice", "Youth"],
          position: ["Testing"]
        }} />
      </VStack>
      <VStack
        d={{ base: "none", md: "flex" }}
        m="auto"
        w="100%"
      >
        <Heading>{"Tablet & Desktop View!"}</Heading>
        <DTProfileCard profile={userProfile} />
        <DTProjectCard project={{
          title: "Minnesota Coalition For Youth Justice",
          description: "We work as a collective of community members, youth, and families working together envision and create a new juvenile justice system. Our organizational partners include the Legal Rights Center, the University of Minnesota Law School, The Link, ACLU-Minnesota, Project for Pride in Living, Until We Are All Free, Minnesota Alliance with Youth, Youthprise, Minneapolis Youth Coordinating Board, St. Paul Youth Services, N4 and NAACP-Minneapolis, among others.",
          image: "https://res.cloudinary.com/plexus-create/image/upload/v1626101249/projects/bidcuvrkhvqshwqvqktz.png",
          id: 4,
          tags: ["Social Justice"],
          position: ["Testing"]
        }} />
      </VStack>
    </Box>
  )
};

export default NewFeed;