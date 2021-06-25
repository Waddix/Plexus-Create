import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
// import {CardWithImage} from "../../components/CardWithImage"

// interface ProjectProps {

// }

const Project: React.FC<unknown> = ({}) => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
  <Flex>
    <div>Project with id: { projectId }</div>
    {/* <CardWithImage></CardWithImage> */}
  </Flex>
  )
}
export default Project