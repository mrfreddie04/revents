import { auth } from "../../app/config/firebase";
import { authActionTypes } from "./auth-action-types";
import { asyncActions } from "../../app/async/async-reducer";
import { profileActions } from '../profiles/profile-actions';
import { getUserProfile, dataFromSnapshot } from "../../app/firestore/firebase-db-service";
//import { signInWithEmail } from "../../app/firestore/firebase-auth-service";
//import { delay } from "../../app/common/util/util.js";

const { SIGN_IN_USER, SIGN_OUT_USER } = authActionTypes;
const { asyncActionInitialized } = asyncActions;
const { listenToCurrentUserProfile } = profileActions;

const signOutUser = () => ({ type: SIGN_OUT_USER });

const signInUser = (user) => ({ type: SIGN_IN_USER, payload: user });

const verifyAuth = () => 
{
  return (dispatch) => {
    //const unsub = 
    auth.onAuthStateChanged( (user) => {      
      if(user) {
        dispatch(signInUser(user));
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot((snapshot) => {
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
          dispatch(asyncActionInitialized());
        });  
      } else {
        dispatch(signOutUser());
        dispatch(listenToCurrentUserProfile(null));
        dispatch(asyncActionInitialized());
      }
      //unsub();
    });
  }
}

export const authActions = {
  signInUser: signInUser,
  verifyAuth: verifyAuth,
  signOutUser: signOutUser
}
