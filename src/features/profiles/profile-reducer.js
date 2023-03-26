import { profileActionTypes } from "./profile-action-types";
const { 
  LISTEN_TO_CURRENT_USER_PROFILE, 
  LISTEN_TO_SELECTED_USER_PROFILE, 
  LISTEN_TO_USER_PHOTOS
} = profileActionTypes;

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: []
};

export default function profileReducer(state = initialState, {type, payload}) {
  switch(type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return { ...state, currentUserProfile: {...payload}};
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return { ...state, selectedUserProfile: {...payload}};     
    case LISTEN_TO_USER_PHOTOS:
      return { ...state, photos: [...payload]};         
    default:
      return state; //Or throw an error
  }
}