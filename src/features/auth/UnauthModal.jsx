import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Modal, Button, Divider } from 'semantic-ui-react';
import { modalActions } from "../../app/common/modals/modal-reducer";

const { openModal } = modalActions;

export default function UnauthModal({onModalClose}) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { prevLocation } = useSelector( state => state.auth);
  const history = useHistory();

  const handleClose = () => {
    if(onModalClose) {
      setOpen(false);
      onModalClose();
      return;
    }
    if(history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push('/events');
    }
    setOpen(false);
  }
  
  const handleLogin = () => {
    dispatch(openModal({
      modalType: 'LoginForm'
    }));   
    if(onModalClose) onModalClose();     
  }

  const handleRegister = () => {
    dispatch(openModal({
      modalType: 'RegisterForm'
    }));        
    if(onModalClose) onModalClose();
  }  

  return (
    <Modal open={open} size='mini' onClose={handleClose}>
      <Modal.Header content='You need to be signed in to do that' />
      <Modal.Content>
        <p>Please either login ot register to see this content</p>
        <Button.Group widths={4}>
          <Button fluid color='teal' content="Login" onClick={handleLogin}/>
          <Button.Or />
          <Button fluid color='green' content="Register" onClick={handleRegister}/>          
        </Button.Group>
        <Divider />
        <div style={{textAlign:'center'}}>
          <p>Or click cancel to continue as a guest</p>
          <Button onClick={handleClose} content='Cancel' />
        </div>
      </Modal.Content>
    </Modal>
  )
}