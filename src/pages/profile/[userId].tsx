import { useRouter } from "next/dist/client/router";

function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div>User Profile for user with id: { userId }</div>
  )
}

export default UserProfile;