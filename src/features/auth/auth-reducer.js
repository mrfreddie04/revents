import { authActionTypes } from "./auth-action-types";

const { SIGN_IN_USER, SIGN_OUT_USER } = authActionTypes;

const initialState = {
  authenticated: false,
  currentUser: null
};

export default function authReducer(state = initialState, {type, payload}) {
  switch(type) {
    case SIGN_IN_USER:
      //console.log("AR",type,payload.photoURL);
      return { ...state, authenticated: true, currentUser: {
        uid: payload.uid,
        email: payload.email,
        displayName: payload.displayName,
        photoURL: payload.photoURL || '/assets/user.png',
        providerId: payload.providerData[0].providerId
      } };  
    case SIGN_OUT_USER :
      return { ...state, ...initialState };  
    default:
      return state; 
  }
}