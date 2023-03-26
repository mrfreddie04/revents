import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { toast } from 'react-toastify';
//import { authActions } from '../../features/auth/auth-actions';
import { signOut } from "../../app/firestore/firebase-auth-service";

//const { signOutUser } = authActions;

export default function SignedInMenu() {
  const { currentUserProfile } = useSelector(state => state.profile);
  //const dispatch = useDispatch();
  const history = useHistory();

  const { email, photoURL, displayName, id } = currentUserProfile;

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
          <Dropdown.Item text='My profile' icon='user' as={Link} to={`/profile/${id}`}/>
          <Dropdown.Item text='My account' icon='settings' as={Link} to='/account' />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut}/>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
