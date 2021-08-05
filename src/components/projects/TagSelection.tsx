import { Stack, Tag, TagLabel } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ProjectsContext } from "../../context/projectsContext";
import { useAllTagsQuery } from "../../generated/graphql";

export const AllTags: React.FC = () => {
  const [{ data }] = useAllTagsQuery();
  const { setProjectTag } = useContext(ProjectsContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    data?.tags.forEach((tag) => {
      if (tag.name === event.target.innerText) {
        setProjectTag(tag.id);
      }
    });
  };
  return (
    <Stack spacing={4} isInline>
      {data?.tags.map((tag) => (
        <Tag
          size="md"
          key={tag.id}
          rounded="full"
          variant="solid"
          variantColor="cyan"
          cursor="pointer"
        >
          <TagLabel onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handleClick(e)} key={tag.id}>
            {tag.name}
          </TagLabel>
        </Tag>
      ))}
    </Stack>
  );
};
