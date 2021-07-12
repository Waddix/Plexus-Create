import { Stack, Tag, TagLabel,} from '@chakra-ui/react';
import React from 'react'
import { useAllTagsQuery, useAssignProjectTagMutation } from '../../generated/graphql';

interface ProjectTagProps {
  id: number;
}

export const ProjectTags: React.FC<ProjectTagProps> = ({id}) => {
  const [{ data }] = useAllTagsQuery();
  const [, assignTag] = useAssignProjectTagMutation();
  return (<Stack spacing={4} isInline>
    {data?.tags.map(tag => (
      <Tag
        size="md"
        key={tag.id}
        rounded="full"
        variant="solid"
        variantColor="cyan"
        cursor="grabbing"
        onClick={() => {
          assignTag({
            projectId: id,
            tagId: tag.id
          })
        }}
      >
        <TagLabel>{tag.name}</TagLabel>
      </Tag>
    ))}
  </Stack>);
}
