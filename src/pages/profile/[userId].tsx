import React, { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { UserCard } from "../../components/UserCard";
import { useProfileLookupQuery } from "../../generated/graphql";
import { UserContext } from "../../context/userContext";
import { withUrqlClient } from "next-urql";
import { ProjectCard } from "../../components/projects/ProjectCard";

const UserProfile: React.FC<unknown> = () => {
  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;
  const router = useRouter();
  const { userId } = router.query;
  const userIdInt = typeof userId === "string" ? parseInt(userId) : 0;

  const [{ fetching, data }] = useProfileLookupQuery({
    variables: { id: userIdInt },
  });
  if (fetching) {
    return <Text>Loading Profile</Text>;
  } else {
      const { username, image } = data?.profileLookup;
      return (
        <div>
          <Flex justify={"center"}>
            <UserCard profile={data?.profileLookup} currId={id} />
          </Flex>
          <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
            {data?.profileLookup?.projects?.map((p) => {
              return <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} image={p.image} username={username} profileImage={image}> </ProjectCard>
            })}
          </SimpleGrid>
        </div>
      );
  }
};

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(UserProfile);
