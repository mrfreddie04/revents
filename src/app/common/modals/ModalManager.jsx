import React from "react";
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import TestModal from '../../../features/sandbox/TestModal';
import LoginForm from '../../../features/auth/LoginForm';
import RegisterForm from '../../../features/auth/RegisterForm';

export default function ModalManager() {
  const container = document.getElementById('modal');
  const modalLookup = {
    'TestModal': TestModal,
    'LoginForm': LoginForm,
    'RegisterForm': RegisterForm,
  };
  const currentModal = useSelector(state => state.modal);
  let renderedModal = null;
  
  if(currentModal) {
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <span><ModalComponent {...modalProps}/></span>
  }

  //return renderedModal;

  return ReactDOM.createPortal(
    renderedModal,
    container
  );
}  