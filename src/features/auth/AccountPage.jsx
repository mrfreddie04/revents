import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Header, Segment, Button, Label } from "semantic-ui-react";
import { updateUserPassword } from '../../app/firestore/firebase-service';
import TextInput from '../../app/common/form/text-input';
import { delay } from "../../app/common/util/util";

const initialValues = {
  password:'',
  passwordConfirm:''
};

export default function AccountPage() {
  const { currentUser } = useSelector(state => state.auth);

  const handleFormSubmit = async (values, {setSubmitting, setErrors}) => {
    try {
      await delay(500);
      await updateUserPassword(values);
    } catch(error) {
      setErrors({auth: error.message});
    } finally {      
      setSubmitting(false);
    }
  }

  const validationSchema = Yup.object({
    password: Yup.string().required('You must provide a password'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match')
  })

  return (
    <Segment>
      <Header dividing size='large' content='Account'/>
      {/password/i.test(currentUser.providerId) && (
        <>
          <Header color='teal' sub content='Change Password'/>
          <p>Use this form to change your password</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
          {({dirty, isSubmitting, isValid, errors}) => (
            <Form className="ui form" style={{width:'100%'}}>
              <TextInput placeholder="New Password" name="password" type="password"/>
              <TextInput placeholder="Confirm New Password" name="passwordConfirm" type="password"/>
              {errors.auth && <Label basic color='red' style={{marginBottom:'10px'}} content={errors.auth}/>}
              <Button 
                style={{display:'block'}}
                type='submit' 
                loading={isSubmitting} 
                disabled={!isValid || !dirty || isSubmitting} 
                size='large'
                positive
                content='Update Password'
              />
            </Form>
          )} 
          </Formik>
        </>
      )}
      {/facebook/i.test(currentUser.providerId) && (
        <>
          <Header color='teal' sub content='Facebook account'/>
          <p>Please visit Facebook to update your account</p>
          <Button color='facebook' icon='facebook' as={Link} to='https://facebook.com' content='Go to Facebook'/>
        </>
      )}
      {/google/i.test(currentUser.providerId) && (
        <>
          <Header color='teal' sub content='Google account'/>
          <p>Please visit Google to update your account</p>
          <Button color='google plus' icon='google' as={Link} to='https://google.com' content='Go to Google'/>
        </>      
      )}
    </Segment>
  )
}