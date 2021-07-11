import { Stack, Tag, TagLabel,} from '@chakra-ui/react';
import React from 'react'
import { useProjectTagsByIdQuery } from '../../generated/graphql';

interface ProjectTagProps {
  id: number;
}

export const ProjectTagsByID: React.FC<ProjectTagProps> = ({id}) => {
  const [{ data }] = useProjectTagsByIdQuery({variables:{
    projectId: id
  }});

  return (<Stack spacing={4} isInline>
    {data?.projectTags.map(tag => (
      <Tag
        size="md"
        key={tag.id}
        rounded="full"
        variant="solid"
        variantColor="cyan"
        cursor="grabbing"
      >
        <TagLabel>{tag.name}</TagLabel>
      </Tag>
    ))}
  </Stack>);
}
