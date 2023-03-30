import { authActionTypes } from "./auth-action-types";
import { LOCATION_CHANGE } from "connected-react-router";
const { SIGN_IN_USER, SIGN_OUT_USER } = authActionTypes;

const initialState = {
  authenticated: false,
  currentUser: null,
  prevLocation: null,
  currentLocation: null
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
    case LOCATION_CHANGE:
      return { 
          ...state, 
          prevLocation: state.currentLocation, 
          currentLocation: payload.location 
        };  
    default:
      return state; 
  }
}