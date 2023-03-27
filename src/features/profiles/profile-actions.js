import { profileActionTypes } from "./profile-action-types";

const { 
  LISTEN_TO_CURRENT_USER_PROFILE, 
  LISTEN_TO_SELECTED_USER_PROFILE, 
  LISTEN_TO_USER_PHOTOS,
  LISTEN_TO_USER_EVENTS
} = profileActionTypes;

export const profileActions = {
  listenToCurrentUserProfile: (profile) => ({ type: LISTEN_TO_CURRENT_USER_PROFILE , payload: profile}),
  listenToSelectedUserProfile: (profile) => ({ type: LISTEN_TO_SELECTED_USER_PROFILE , payload: profile}),
  listenToUserPhotos: (photos) => ({ type: LISTEN_TO_USER_PHOTOS, payload: photos}),
  listenToUserEvents: (events) => ({ type: LISTEN_TO_USER_EVENTS, payload: events}),
}