import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CustomDonationInput } from "./DonationInput";
import { ProjectTagsByID } from "./ProjectTagsByID";

interface ProjectDetailsProps {
  id: number;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  // email?: string,
  image?: string;
}

interface DescriptionProps {
  description?: string;
}

const Description = ({ description }: DescriptionProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <Box>
      <Heading as="h4" fontSize="md">
        Description
      </Heading>
      <Collapse startingHeight={22} in={show}>
        {description}
      </Collapse>
      <Spacer>
        <Button size="sm" onClick={handleToggle} mt="1rem" variant="link" p="0">
          Show {show ? "Less" : "More"}
        </Button>
      </Spacer>
    </Box>
  );
};

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  id,
  description,
  createdAt,
  title,
  username,
  image,
}) => {
  dayjs.extend(relativeTime);
  const postedAt = dayjs().to(dayjs(createdAt));
  return (
    <Box p={8} rounded="xl">
      <Box>
        <Heading as="h3">{title}</Heading>
        <Box>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar size={"md"} src={image} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{username}</Text>
              <Text color={"gray.500"}> {postedAt}</Text>
                <ProjectTagsByID id={id}></ProjectTagsByID>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Box mt={4}>
        {description ? (
          <Description description={description}></Description>
        ) : (
          <Text>Project Not Found</Text>
        )}
      </Box>
      <Divider orientation="horizontal" mt={4} />
      <Heading fontSize="lg" mt={3} mb={4}>
        Donate to this Project!
      </Heading>
      <CustomDonationInput id={id}></CustomDonationInput>
      <Divider orientation="horizontal" mt={4} />
      <Box>
        <Heading fontSize="lg" mt={3} mb={4}>
          Share this Project!
        </Heading>
        <HStack>
          <SocialIcon url="https://linkedin.com/" />
          <SocialIcon network="tumblr" />
          <SocialIcon network="twitter" />
          <SocialIcon network="facebook" />
        </HStack>
      </Box>
    </Box>
  );
};
