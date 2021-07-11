import { SimpleGrid } from "@chakra-ui/react";
import React, { Fragment, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useGetFollowedUsersQuery } from "../../generated/graphql";
import UserCard from "../UserCard";

const FollowingFeed = (): JSX.Element => {
  const { userProfile } = useContext(UserContext);
  const { id } = userProfile;

  const [{ fetching, data, error }] = useGetFollowedUsersQuery({ variables: { profileId: id } });

  if (fetching) {
    return (
      <h2>Hold up big homie</h2>
    )
  } else if (error) {
    return (
      <div>{error.message}</div>
    )
  } else if (data) {
    const followedUsersCards = data?.getFollowedUsers?.map(user => (
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
  } else {
    return (
      <Fragment>
      </Fragment>
    )
  }
}

export default FollowingFeed