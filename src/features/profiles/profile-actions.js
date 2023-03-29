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
  CLEAR_FOLLOWINGS,
} = profileActionTypes;

export const profileActions = {
  listenToCurrentUserProfile: (profile) => ({ type: LISTEN_TO_CURRENT_USER_PROFILE , payload: profile}),
  listenToSelectedUserProfile: (profile) => ({ type: LISTEN_TO_SELECTED_USER_PROFILE , payload: profile}),
  listenToUserPhotos: (photos) => ({ type: LISTEN_TO_USER_PHOTOS, payload: photos}),
  listenToUserEvents: (events) => ({ type: LISTEN_TO_USER_EVENTS, payload: events}),
  listenToUserFollowers: (followers) => ({ type: LISTEN_TO_FOLLOWERS, payload: followers}),
  listenToUserFollowing: (following) => ({ type: LISTEN_TO_FOLLOWING, payload: following}),
  listenToUserFeed: (feed) => ({ type: LISTEN_TO_FEED, payload: feed}),
  setFollowUser: () => ({type: SET_FOLLOW_USER}),
  setUnfollowUser: () => ({type: SET_UNFOLLOW_USER}),
  clearFollowings: () => ({type: CLEAR_FOLLOWINGS}),
}