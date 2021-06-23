import { useRouter } from "next/dist/client/router";

function Project() {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>Project with id: { projectId }</div>
  )
}

export default Project;