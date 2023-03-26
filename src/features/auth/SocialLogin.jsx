import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { socialLogin } from "../../app/firestore/firebase-auth-service";
import { modalActions } from "../../app/common/modals/modal-reducer";

const { closeModal } = modalActions;

export default function SocialLogin() {
  const history = useHistory();
  const dispatch = useDispatch();  

  const handleLoginFacebook = async () => {
    dispatch(closeModal());
    try {
      await socialLogin('facebook');
    } catch(error) {
      toast.error(error.message);
    } finally {
      history.push('/events');  
    }
  }

  const handleLoginGoogle = async () => {
    dispatch(closeModal());
    try {
      await socialLogin('google');
    } catch(error) {
      toast.error(error.message);
    } finally {
      history.push('/events');  
    }
  }

  return (
    <>
      <Button
        color='facebook'
        fluid
        icon='facebook'
        content='Login with Facebook'
        style={{marginBottom:'10px'}}    
        onClick={handleLoginFacebook}
      />
      <Button
        color='google plus'
        fluid
        icon='google'
        content='Login with Google'
        onClick={handleLoginGoogle}
      />
    </>
  );
}  