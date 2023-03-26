import { profileActionTypes } from "./profile-action-types";

const { LISTEN_TO_CURRENT_USER_PROFILE, LISTEN_TO_SELECTED_USER_PROFILE, UPDATE_PROFILE } =profileActionTypes;

export const profileActions = {
  listenToCurrentUserProfile: (profile) => ({ type: LISTEN_TO_CURRENT_USER_PROFILE , payload: profile}),
  listenToSelectedUserProfile: (profile) => ({ type: LISTEN_TO_SELECTED_USER_PROFILE , payload: profile}),
  updateEvent: (profile) => ({ type: UPDATE_PROFILE, payload: profile}),
}