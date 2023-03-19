import React from "react";
import { Container, Menu, Button } from 'semantic-ui-react';
import Logo from "./../../assets/logo.png";

export default function NavBar({onFormOpen}) {

  const handleClick = () => {
    onFormOpen();
  }

  return(
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src={Logo} alt="logo" style={{marginRight:"15px"}}/>
          Re-vent
        </Menu.Item>        
        <Menu.Item name="Events"/>
        <Menu.Item>
          <Button positive inverted content="Create Event" onClick={handleClick}/>
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted content="Login"/>
          <Button basic inverted content="Register" style={{marginLeft:"0.5em"}}/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};