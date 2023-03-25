import React from "react";
//import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Menu, Button } from 'semantic-ui-react';
import { modalActions } from "../../app/common/modals/modal-reducer";

export default function SignedOutMenu() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(modalActions.openModal({
      modalType: 'LoginForm'
    }));    
  }

  const handleRegister = () => {
    dispatch(modalActions.openModal({
      modalType: 'RegisterForm'
    }));    
  }

  return(
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={handleLogin}/>
      <Button basic inverted content="Register" style={{marginLeft:"0.5em"}} onClick={handleRegister}/>
    </Menu.Item>
  );
};
