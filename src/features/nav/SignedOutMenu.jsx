import React from "react";
//import { NavLink } from "react-router-dom";
import { Menu, Button } from 'semantic-ui-react';

export default function SignedOutMenu({onSignIn}) {

  return(
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={onSignIn}/>
      <Button basic inverted content="Register" style={{marginLeft:"0.5em"}}/>
    </Menu.Item>
  );
};
