import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers, getFollowing } from "../../../app/firestore/firebase-db-service";
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import ProfileCard from "./ProfileCard";
import { profileActions } from "../profile-actions";

const { listenToUserFollowers, listenToUserFollowing } = profileActions;

export default function FollowingTab({profile, mode}) {
  const dispatch = useDispatch();
  const { following, followers } = useSelector( state => state.profile);
  const query = mode === "followers" ? getFollowers : getFollowing;
  const data = mode === "followers" ? listenToUserFollowers : listenToUserFollowing; 
  const header = mode === "followers" ? "Followers" : "Following"; 

  useFirestoreCollection({
    query: () => query(profile.id),
    data: (followings) => dispatch(data(followings)),
    deps: [dispatch, mode, profile.id] 
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={header}/>
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {mode === "following" && following.map( profile => (<ProfileCard key={profile.id} profile={profile}/>))}
            {mode === "followers" && followers.map( profile => (<ProfileCard key={profile.id} profile={profile}/>))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
} 