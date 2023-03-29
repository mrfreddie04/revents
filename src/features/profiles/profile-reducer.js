import { profileActionTypes } from "./profile-action-types";
const { 
  LISTEN_TO_CURRENT_USER_PROFILE, 
  LISTEN_TO_SELECTED_USER_PROFILE, 
  LISTEN_TO_USER_PHOTOS,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWING,
  LISTEN_TO_FEED,
  SET_FOLLOW_USER,
  SET_UNFOLLOW_USER,    
  CLEAR_FOLLOWINGS
} = profileActionTypes;

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  events: [],
  feed: [],
  following: [],
  followers: [],
  followingUser: false
};

export default function profileReducer(state = initialState, {type, payload}) {
  switch(type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return { ...state, currentUserProfile: payload};
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return { ...state, selectedUserProfile: payload};
    case LISTEN_TO_USER_PHOTOS:
      return { ...state, photos: [...payload]};
    case LISTEN_TO_USER_EVENTS:
      return { ...state, events: [...payload]};
    case LISTEN_TO_FOLLOWERS:
      return { ...state, followers: [...payload]}; 
    case LISTEN_TO_FOLLOWING:
      return { ...state, following: [...payload]};
    case LISTEN_TO_FEED:
      return { ...state, feed: [...payload]};  
    case SET_FOLLOW_USER:
      return { ...state, followingUser: true};
    case SET_UNFOLLOW_USER:
      return { ...state, followingUser: false};
    case CLEAR_FOLLOWINGS:
      return { ...state, followers:[], following:[] };      
    default:
      return state; //Or throw an error
  }
}