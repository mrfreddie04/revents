import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import TextInput from '../../app/common/form/text-input';
import { authActions } from './auth-reducer';
import { modalActions } from "../../app/common/modals/modal-reducer";

const initialValues = {
  email:'',
  password:''
};

export default function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFormSubmit = (values, {setSubmitting}) => {
    //console.log(values);
    dispatch(authActions.signInUser({email: values.email}));
    setSubmitting(false);
    dispatch(modalActions.closeModal());
    history.push('/events');  
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
      {({dirty, isSubmitting, isValid}) => (
        <Form className="ui form" style={{width:'100%'}}>
          <TextInput placeholder="Email" name="email"/>
          <TextInput placeholder="Password" name="password" type="password"/>
          <Button 
            type='submit' 
            loading={isSubmitting} 
            disabled={!isValid || !dirty || isSubmitting} 
            floated='right'
            fluid
            size='large'
            color='teal'
            content='Login'
          />
        </Form>    
      )}     
      </Formik> 
    </ModalWrapper>
  )
}