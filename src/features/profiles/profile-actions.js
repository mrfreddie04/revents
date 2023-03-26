import { profileActionTypes } from "./profile-action-types";

const { 
  LISTEN_TO_CURRENT_USER_PROFILE, 
  LISTEN_TO_SELECTED_USER_PROFILE, 
  LISTEN_TO_USER_PHOTOS
} = profileActionTypes;

export const profileActions = {
  listenToCurrentUserProfile: (profile) => ({ type: LISTEN_TO_CURRENT_USER_PROFILE , payload: profile}),
  listenToSelectedUserProfile: (profile) => ({ type: LISTEN_TO_SELECTED_USER_PROFILE , payload: profile}),
  listenToUserPhotos: (photos) => ({ type: LISTEN_TO_USER_PHOTOS, payload: photos}),
}