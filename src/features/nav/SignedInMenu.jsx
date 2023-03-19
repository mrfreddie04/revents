import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from 'semantic-ui-react';

export default function SignedInMenu({onSignOut}) {

  return(
    <Menu.Item position="right">
      <Image avatar spaced='right' src='/assets/user.png' alt='User image' />
      <Dropdown pointing='top left' text='Bob'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/create-event' text='Create Event' icon='plus'/>
          <Dropdown.Item text='My profie' icon='user'/>
          <Dropdown.Item text='Sign out' icon='power' onClick={onSignOut}/>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
