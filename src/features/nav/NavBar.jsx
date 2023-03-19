import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Container, Menu, Button } from 'semantic-ui-react';
import Logo from "./../../assets/logo.png";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";

export default function NavBar(/*{onFormOpen}*/) {
  const [authenticated, setAuthenticated] = useState(false)
  const history = useHistory();
  // const handleClick = () => {
  //   onFormOpen();
  // }

  const handleSignIn = () => {
    setAuthenticated(true);
  }

  const handleSignOut = () => {
    setAuthenticated(false);
    history.push("/");
  }

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
        {!authenticated && <SignedOutMenu onSignIn={handleSignIn} />}
        {authenticated && <SignedInMenu onSignOut={handleSignOut}/>}
      </Container>
    </Menu>
  );
};