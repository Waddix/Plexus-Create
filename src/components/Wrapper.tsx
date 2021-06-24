import { Box } from '@chakra-ui/react';
import React from 'react'

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  // react props in typescript 
  // ? === optional
children?: React.ReactNode
variant?: WrapperVariant
}
// wrapper component for easy styling
export const Wrapper = ({
  children, variant = "regular"
} : WrapperProps): JSX.Element => {
    return  (
      <Box
        mt={8}
        mx="auto" 
        maxW={variant === "regular" ? "800px" : "400px"} 
        w="100%"
       >
        {children}
      </Box>
    )
}