import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";

// interface ProjectProps {

// }

const Project: React.FC<unknown> = ({}) => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
  <Flex>
    <div>Project with id: { projectId }</div>
  </Flex>
  )
}
export default Project