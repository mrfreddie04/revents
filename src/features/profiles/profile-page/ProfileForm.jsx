import React from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button } from "semantic-ui-react";
import { updateUserProfile } from '../../../app/firestore/firebase-db-service';
import { delay } from  '../../../app/common/util/util';
import TextInput from '../../../app/common/form/text-input';
import TextArea from '../../../app/common/form/text-area';

export default function ProfileForm({profile}) {

  const initialValues = {
    displayName: profile.displayName,
    description: profile.description || ''
  };

  const handleFormSubmit = async (values, {setSubmitting}) => {
    try {
      await delay(500);
      await updateUserProfile(values);
    } catch(error) {
      toast.error(error.message);
    } finally {      
      setSubmitting(false);
    }
  }
  
  const validationSchema = Yup.object({
    displayName: Yup.string().required('You must provide a [Display Name]')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
    {({dirty, isSubmitting, isValid, errors}) => (
      <Form className="ui form" style={{width:'100%'}}>
        <TextInput placeholder="Display Name" name="displayName" type="text"/>
        <TextArea placeholder="Description" name="description" type="text"/>
        <Button 
          type='submit' 
          loading={isSubmitting} 
          disabled={!isValid || !dirty || isSubmitting} 
          size='large'
          positive
          content='Update Profile'
        />
      </Form>
    )} 
    </Formik>
  )
}  