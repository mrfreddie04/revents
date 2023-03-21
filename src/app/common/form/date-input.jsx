import React from "react";
import DatePicker from 'react-datepicker';
import { FormField, Label } from 'semantic-ui-react';
import { useField /*, useFormikContext*/ } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({label,options,...props}) {
  //const { setFieldValue } =  useFormikContext();
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && !!meta.error;

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  // const handleChange2 = (value) => {
  //   setFieldValue(field.name,value);
  // };
  //const {...f} = field;

  return (
    <FormField error={isError}>
      {label && <label>{label}</label>}
      <DatePicker 
        {...field}
        {...props} 
        showIcon
        selected={(field.value && new Date(field.value)) || null}
        onChange={handleChange}
      />
      {isError && <Label basic color='red' content={meta.error}/>}
    </FormField>
  );
}  