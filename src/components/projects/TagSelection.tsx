import { Stack, Tag, TagLabel } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ProjectsContext } from "../../context/projectsContext";
import { useAllTagsQuery } from "../../generated/graphql";

export const AllTags: React.FC = () => {
  const [{ data }] = useAllTagsQuery();
  const { projectTag, setProjectTag } = useContext(ProjectsContext);
  const handleClick = (event: { target: HTMLSpanElement }) => {
    console.log(event.target.innerText);
    data?.tags.forEach((tag) => {
      if (tag.name === event.target.innerText) {
        setProjectTag(tag.id);
      }
    });
  };
  console.log(projectTag);
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
          <TagLabel onClick={(e: any) => handleClick(e)} key={tag.id}>
            {tag.name}
          </TagLabel>
        </Tag>
      ))}
    </Stack>
  );
};
