import { SimpleGrid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useGetFollowedUsersQuery } from "../../generated/graphql";
import { UserCard } from "../UserCard";

export const FollowingFeed: React.FC = () => {
  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;

  const [{ fetching, data, error }] = useGetFollowedUsersQuery({ variables: { profileId: id } });

  if (fetching) {
    return (
      <h2>Hold up big homie</h2>
    )
  } else if (error) {
    console.error(error);
    return (
      <div>{error.message}</div>
    )
  } else if (data) {
    console.log("data in FollowingFeed", data);
    const followedUsersCards = data?.getFollowedUsers?.map(user => (
      // console.log("user in map ===>", user);
      <UserCard key={user.id} profile={user} currId={id} />
    ))

    return (
      <div>
        {
          < SimpleGrid columns={[2, null, 3]} spacing="20px" maxBlockSize="fit-content" >
            {followedUsersCards}
          </SimpleGrid >
        }
      </div>

    )
  }
}