import React from "react";
import { FormField, Label } from 'semantic-ui-react';
import { useField } from 'formik';

export default function TextInput({label,...props}) {
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error;
  return (
    <FormField error={isError}>
      {label && <label>{label}</label>}
      <input {...field} {...props}/>
      {isError && <Label basic color='red' content={meta.error}/>}
    </FormField>
  );
}  
