import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Container, Menu, Button } from 'semantic-ui-react';
import Logo from "./../../assets/logo.png";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";

export default function NavBar() {
  const { authenticated } = useSelector(state => state.auth)

  return(
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img src={Logo} alt="logo" style={{marginRight:"15px"}}/>
          Re-vent
        </Menu.Item>        
        <Menu.Item as={NavLink} to="/events" name="Events"/>
        {authenticated && <Menu.Item as={NavLink} to="/create-event">
          {/* <Button positive inverted content="Create Event" onClick={handleClick}/> */}
          <Button positive inverted content="Create Event"/>
        </Menu.Item>}
        <Menu.Item as={NavLink} to="/sandbox" name="Sandbox"/>
        {!authenticated && <SignedOutMenu/>}
        {authenticated && <SignedInMenu />}
      </Container>
    </Menu>
  );
};

// const handleSignOut = () => {
//   history.push("/");
// }
//onSignOut={handleSignOut}