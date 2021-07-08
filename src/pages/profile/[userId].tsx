import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/dist/client/router";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { UserCard } from "../../components/UserCard";
import { useProfileLookupQuery } from "../../generated/graphql";
import { UserContext } from "../../context/userContext";
import { withUrqlClient } from "next-urql";
import { ProjectCard } from "../../components/projects/ProjectCard";

function UserProfile(): JSX.Element {
  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;
  const router = useRouter();
  const { userId } = router.query;
  const userIdInt = typeof userId === "string" ? parseInt(userId) : 0;
  // const [profile, setProfile] = useState<any>({})
  // const profileGot = useRef(false);

  // console.log("id from params: ", id);
  const [{ fetching, data, error }] = useProfileLookupQuery({ variables: { id: userIdInt } })
  if (fetching) {
    return <div>Hold up a sec big dawg</div>
  }
  else if (error) {
    console.error(error);
    return <div>{error.message}</div>
  } else {

    if (data) {
      const { username, image } = data.profileLookup
      // const source = "profile"
      return (
        <div>
          <Flex justify={'center'}>
            <UserCard profile={data?.profileLookup} currId={id} />
          </Flex>
          <SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content">
            {data?.profileLookup.projects.map((p, i) => {
              return <ProjectCard key={p.id} id={p.id} description={p.description} title={p.title} createdAt={p.createdAt} updatedAt={p.updatedAt} username={username} image={image}> </ProjectCard>
            })}
          </SimpleGrid>
        </div>

      )
    }

  }


  // useEffect(() => {
  //   setProfile(data?.profileLookup)
  //   profileGot.current = true;
  // }, [data])

  // useEffect(() => {
  //   profileGot.current = true;
  // }, [profile])

  // const [, followUser] = useFollowUserMutation()


}

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(UserProfile);