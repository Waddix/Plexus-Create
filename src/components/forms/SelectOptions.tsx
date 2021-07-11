/* eslint-disable react/prop-types */
import { FormControlProps } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage, Select, SelectProps } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { ReactNode } from 'react'

// props for useField
export type SelectOptionsProps = FormControlProps & {
  name: string;
  label: string;
  selectProps?: SelectProps;
  children: ReactNode;
}
// need size as part of input type def
export const SelectOptions: React.FC<SelectOptionsProps> = ({ label, name, children, selectProps,}: SelectOptionsProps) => {
  const [field, { error }] = useField(name);
  return (
    // !! converts error message to boolean 
    // '' => false
    // 'error message' => true
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...selectProps}placeholder="Select type">
    {children}
  </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}