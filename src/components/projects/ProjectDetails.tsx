import {
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Heading,
  Spacer,
  Stack,
  Text,
  Link,
  Image
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CustomDonationInput } from "./DonationInput";
import { ProjectTagsByID } from "./ProjectTagsByID";
import { UserContext } from "../../context/userContext";
import { PostFormBox } from "../posts/PostForm";
import { PositionCard } from "./Position";
import { PositionForm } from "./PositionForm";

interface ProjectDetailsProps {
  id: number;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  email?: string;
  image?: string;
  projectImage: string;
  ownerId: number | undefined;
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
  image: ownerImage,
  ownerId,
  projectImage,
}) => {
  dayjs.extend(relativeTime);
  const postedAt = dayjs().to(dayjs(createdAt));
  const { userProfile } = useContext(UserContext);
  return (
    <Box p={8} rounded="xl">
      <Box>
        <Box alignContent="center" height="max-content">
          <Image
            src={projectImage.length > 0 ? projectImage :"/PlexusProject3D.png"}
            alt={title}
            shadow="xl"
            rounded="xl"
          ></Image>
        </Box>
      </Box>
      <Box>
        <Heading as="h3">{title}</Heading>
        <Box>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Link href={`/profile/${ownerId}`}>
            <Avatar size={"md"} src={ownerImage} />
          </Link>
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Link href={`/profile/${ownerId}`}>
              <Text fontWeight={600}>{username}</Text>
            </Link>
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
      {userProfile.id === ownerId ?
        <Stack mt={6} direction={"column"} spacing={4} align={"center"}>
          <PostFormBox projectId={id} ownerId={userProfile.id} />
          <PositionForm id={id}></PositionForm>
        </Stack>
        :
        <div>
          <Heading fontSize="lg" mt={3} mb={4}>
            Donate to this Project!
          </Heading>
          <CustomDonationInput id={id}></CustomDonationInput>
        </div>
      }
      <Container>
        <PositionCard
          projectId={id}
          username={username}
          image={ownerImage}
        ></PositionCard>
      </Container>
      <Divider orientation="horizontal" mt={4} />
    </Box>
  );
};
