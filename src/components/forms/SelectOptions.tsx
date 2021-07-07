/* eslint-disable react/prop-types */
import { FormControl, FormLabel, Input, FormErrorMessage, Select, SelectProps } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes, ReactNode } from 'react'

// props for useField
type SelectOptionsProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  selectProps?: SelectProps;
  children: ReactNode;
}
// need size as part of input type def
export const SelectOptions: React.FC<SelectOptionsProps> = ({ label, size, children, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    // !! converts error message to boolean 
    // '' => false
    // 'error message' => true
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select placeholder="Select type">
    {children}
  </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}