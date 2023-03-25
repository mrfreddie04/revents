import { auth } from "../../app/config/firebase";
import { authActionTypes } from "./auth-action-types";
import { asyncActions } from "../../app/async/async-reducer";
//import { signInWithEmail } from "../../app/firestore/firebase-service";
//import { delay } from "../../app/common/util/util.js";

const { SIGN_IN_USER, SIGN_OUT_USER } = authActionTypes;
const { asyncActionInitialized } = asyncActions;

const signOutUser = () => ({ type: SIGN_OUT_USER });

const signInUser = (user) => ({ type: SIGN_IN_USER, payload: user });

// const signInUser2 = (creds) => 
// {
//   return async (dispatch) => {
//     try {
//       //returns FB auth user credential
//       //console.log(creds.email, creds.password);
//       await delay(1000);
//       const result = await signInWithEmail(creds);
//       dispatch({ type: SIGN_IN_USER, payload: result.user});
//     } catch(error) {
//       //throw error to the login/signup form
//       throw error;
//     }      
//   }  
// };

const verifyAuth = () => 
{
  return (dispatch) => {
    //const unsub = 
    auth.onAuthStateChanged( (user) => {      
      if(user) {
        //console.log("OAC", user)
        dispatch(signInUser(user));
      } else {
        dispatch(signOutUser());
      }
      dispatch(asyncActionInitialized());
      //unsub();
    });
  }
}

export const authActions = {
  signInUser: signInUser,
  verifyAuth: verifyAuth,
  signOutUser: signInUser
}
