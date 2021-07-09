import { Stack, Tag, TagLabel,} from '@chakra-ui/react';
import React from 'react'
import { usePositionTagsQuery } from '../../generated/graphql';

interface PositionTagProps {
  id: number | undefined;
}

export const PositionTagsByID: React.FC<PositionTagProps> = ({id}) => {
  const [{ data, error }] = usePositionTagsQuery({
    pause: typeof id === "undefined",
    variables:{
    positionId: id
  }});
  if (error) {
    console.log(error)
  } 
  return (<Stack spacing={4} isInline>
    {data?.positionTags.map(tag => (
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
