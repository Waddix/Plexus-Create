import { useRouter } from "next/dist/client/router";
import React from "react";

function Project(): JSX.Element {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>Project with id: { projectId }</div>
  )
}

export default Project;