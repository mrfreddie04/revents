import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Divider, Label } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import TextInput from '../../app/common/form/text-input';
//import { authActions } from './auth-actions';
import { modalActions } from "../../app/common/modals/modal-reducer";
import { signInWithEmail } from "../../app/firestore/firebase-auth-service";
import { delay } from "../../app/common/util/util";
import SocialLogin from "./SocialLogin";

//const { signInUser } = authActions;
const { closeModal } = modalActions;

const initialValues = {
  email:'',
  password:''
};

export default function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, {setSubmitting, setErrors}) => {
    //console.log(values);
    try {
      //await dispatch(signInUser({email: values.email, password: values.password}));
      await signInWithEmail({email: values.email, password: values.password});
      await delay(500);
      //dispatch(signInUser(user));
      setSubmitting(false);
      dispatch(closeModal());
      history.push('/events');  
    } catch(error) {
      setErrors({auth: "Problem with user name or password"});
      setSubmitting(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('You must provide an email').email(),
    password: Yup.string().required('You must provide a password')
  })

  return (
    <ModalWrapper size='mini' header='Sign in to Re-vents'>
      <Formik
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
      {({dirty, isSubmitting, isValid, errors}) => (
        <Form className="ui form" style={{width:'100%'}}>
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
            content='Login'
          />
          <Divider horizontal>Or</Divider>
          <SocialLogin/>
        </Form>    
      )}     
      </Formik> 
    </ModalWrapper>
  )
}