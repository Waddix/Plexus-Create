import { Stack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import React from 'react'
import { useAllTagsQuery, useAssignProjectTagMutation } from '../../generated/graphql';

// interface ProjectTagProps {
//   project: Project;
// }

export const ProjectTags: React.FC<unknown> = () => {
  const [{ data }] = useAllTagsQuery();
  const [{ fetching, error }, assignTag] = useAssignProjectTagMutation();
  if (error) {
    console.log(error)
  }
  return (<Stack spacing={4} isInline>
    {data?.tags.map(tag => (
      <Tag
        size="md"
        key={tag.id}
        rounded="full"
        variant="solid"
        variantColor="cyan"
      >
        <TagLabel>{tag.name}</TagLabel>
        <TagCloseButton onClick={() => {
          console.log("click")
          assignTag({
            projectId: 2,
            tagId: parseInt(tag.id)
          })
        }} />
      </Tag>
    ))}
  </Stack>);
}