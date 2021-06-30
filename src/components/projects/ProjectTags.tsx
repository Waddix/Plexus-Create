import { Stack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import React from 'react'
import { useAllTagsQuery } from '../../generated/graphql';

// interface ProjectTagsProps {

// }

export const ProjectTags: React.FC<unknown> = ({}) => {
  const [{data}] = useAllTagsQuery();

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
          <TagCloseButton />
        </Tag>
      ))}
    </Stack>);
}