import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { getUserProfile } from "../../../app/firestore/firebase-db-service";
import { profileActions } from '../profile-actions';
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const { listenToSelectedUserProfile } = profileActions;

export default function ProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUserProfile, currentUserProfile } = useSelector(state => state.profile);
  const { currentUser } = useSelector(state => state.auth);
  const { loading, error } = useSelector(state => state.async);
  
  const isCurrentUser = currentUser.uid === id;

  useFirestoreDoc({
    query: () => getUserProfile(id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, id],
    shouldExecute: !isCurrentUser
  });    

  const profile = isCurrentUser ? currentUserProfile : selectedUserProfile;

  if((loading && !profile) || (!profile && !error)) {
    return <LoadingComponent content="Loading user profile..."/>
  }

  if(error) {
    return (<Redirect to="/error"/>);
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} isCurrentUser={isCurrentUser}/>
        <ProfileContent profile={profile} isCurrentUser={isCurrentUser}/>
      </Grid.Column>
    </Grid>  
  )
}  