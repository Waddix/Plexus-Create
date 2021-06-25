import React from "react";
import { useRouter } from "next/dist/client/router";

function UserProfile(): JSX.Element {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div>User Profile for user with id: { userId }</div>
  )
}

export default UserProfile;