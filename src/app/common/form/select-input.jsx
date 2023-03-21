import React from "react";
import { FormField, Label, Select } from 'semantic-ui-react';
import { useField } from 'formik';

export default function SelectInput({label, options,...props}) {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && !!meta.error;

  const handleChange = (e, data) => {
    helpers.setValue(data.value);
  };
  
  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <FormField error={isError}>
      {label && <label>{label}</label>}
      <Select 
        clearable 
        value={field.value || null}
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        {...props} 
      />
      {isError && <Label basic color='red' content={meta.error}/>}
    </FormField>
  );
}  
