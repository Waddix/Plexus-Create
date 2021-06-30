/* eslint-disable react/prop-types */
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

// props for useField
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  // Property 'name' is optional in type 'InputHTMLAttributes<HTMLInputElement> & { children?: ReactNode; }' but required in type 'FieldConfig<any>'.ts(2345
  name: string;
  label: string;
}
// need size as part of input type def
export const InputField: React.FC<InputFieldProps> = ({ label, size, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    // !! converts error message to boolean 
    // '' => false
    // 'error message' => true
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}