import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { authActions } from '../../features/auth/auth-reducer';

export default function SignedInMenu() {
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const { email, photoURL } = currentUser;

  const handleSignOut = () => {
    dispatch(authActions.signOutUser());
    history.push("/");
  }

  return(
    <Menu.Item position="right">
      <Image avatar spaced='right' src={ photoURL || '/assets/user.png' } alt='User image' />
      <Dropdown pointing='top left' text={email}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/create-event' text='Create Event' icon='plus'/>
          <Dropdown.Item text='My profie' icon='user'/>
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut}/>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
