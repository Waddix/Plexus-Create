/* eslint-disable react/prop-types */
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import { useField } from 'formik';
import React, { TextareaHTMLAttributes } from 'react'

// props for useField
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
}
// omit size 
export const TextArea: React.FC<TextAreaProps> = ({label,  ...props}) => {
  const [field, {error}] = useField(props);
    return (
      // !! converts error message to boolean 
      // '' => false
      // 'error message' => true
      <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea {...field} {...props} id={field.name}/>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
    );
}