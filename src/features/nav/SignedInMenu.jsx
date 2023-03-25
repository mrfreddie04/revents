import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { toast } from 'react-toastify';
//import { authActions } from '../../features/auth/auth-actions';
import { signOut } from "../../app/firestore/firebase-service";

//const { signOutUser } = authActions;

export default function SignedInMenu() {
  const { currentUser } = useSelector(state => state.auth);
  //const dispatch = useDispatch();
  const history = useHistory();

  const { email, photoURL, displayName } = currentUser;

  //console.log("SIM", email, photoURL);

  const handleSignOut = async () => {
    //dispatch(signOutUser());
    try {
      history.push("/");
      await signOut();
    } catch(error) {
      toast.error(error);
    }
  }

  return(
    <Menu.Item position="right">
      <Image avatar spaced='right' src={ photoURL || '/assets/user.png' } alt='User image' />
      <Dropdown pointing='top left' text={displayName || email}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/create-event' text='Create Event' icon='plus'/>
          <Dropdown.Item text='My profie' icon='user'/>
          <Dropdown.Item text='My account' icon='settings' as={Link} to='/account' />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut}/>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
