import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Label, Divider } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import TextInput from '../../app/common/form/text-input';
import { modalActions } from "../../app/common/modals/modal-reducer";
import { registerWithEmail } from "../../app/firestore/firebase-service";
import { delay } from "../../app/common/util/util";
import SocialLogin from "./SocialLogin";

const { closeModal } = modalActions;

const initialValues = {
  email:'',
  password:'',
  displayName:''
};

export default function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, {setSubmitting, setErrors}) => {
    //console.log(values);
    const {email, password, displayName} = values;
    try {
      await registerWithEmail({email, password, displayName});
      await delay(500);
      setSubmitting(false);
      dispatch(closeModal());
      history.push('/events');  
    } catch(error) {
      setErrors({auth: error.message});      
      setSubmitting(false);
    }
  }

  const validationSchema = Yup.object({
    displayName: Yup.string().required('You must provide a display name'),
    email: Yup.string().required('You must provide an email').email(),
    password: Yup.string().required('You must provide a password')
  })

  return (
    <ModalWrapper size='mini' header='Register to Re-vents'>
      <Formik
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
      {({dirty, isSubmitting, isValid, errors}) => (
        <Form className="ui form" style={{width:'100%'}}>
          <TextInput placeholder="Display Name" name="displayName"/>
          <TextInput placeholder="Email" name="email"/>
          <TextInput placeholder="Password" name="password" type="password"/>
          {errors.auth && <Label basic color='red' style={{marginBottom:'10px'}} content={errors.auth}/>}          
          <Button 
            type='submit' 
            loading={isSubmitting} 
            disabled={!isValid || !dirty || isSubmitting} 
            fluid
            size='large'
            color='teal'
            content='Register'
          />
          <Divider horizontal>Or</Divider>
          <SocialLogin/>          
        </Form>    
      )}     
      </Formik> 
    </ModalWrapper>
  )
}