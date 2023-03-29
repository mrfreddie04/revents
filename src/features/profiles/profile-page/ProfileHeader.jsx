import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useHistory } from "react-router-dom";
import { Segment, Grid, Item, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';
import { profileActions } from '../profile-actions';
// import { authActions } from '../../features/auth/auth-actions';
// import { signOut } from "../../app/firestore/firebase-auth-service";
import { followUser, unfollowUser, isFollowing } from '../../../app/firestore/firebase-db-service';

const { setFollowUser, setUnfollowUser /*, clearFollowings*/ } = profileActions;

export default function ProfileHeader({profile, isCurrentUser}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const { followingUser } = useSelector(state => state.profile);

  const {displayName, photoURL, followingCount, followersCount} = profile;

  useEffect(() => {
    if(isCurrentUser) return;
    setLoading(true);

    const checkFollowing = async () => {
      try {
        await isFollowing(profile.id)
          ? dispatch(setFollowUser())
          : dispatch(setUnfollowUser());
      } catch(error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    checkFollowing();

    //return () => dispatch(clearFollowings());
  },[dispatch, profile.id, isCurrentUser])

  const handleFollowUser = async () => {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch(error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollowUser = async () => {
    setLoading(true);
    try {
      await unfollowUser(profile);
      dispatch(setUnfollowUser());
    } catch(error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size='small' src={photoURL ||'/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h1' style={{display:'block', marginBottom:'10px'}} content={displayName}/>
              </Item.Content>            
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={followersCount || 0}/>
            <Statistic label='Following' value={followingCount || 0}/>
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider/>
              <Reveal animated='move'>
                <Reveal.Content visible style={{width:'100%'}}>
                  <Button fluid color='teal' 
                    content={followingUser ? 'Following' : 'Not following'}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{width:'100%'}}>
                  { followingUser && (
                    <Button basic fluid color='red' 
                      content='Unfollow'
                      loading={loading}
                      onClick={handleUnfollowUser}                    
                    />                  
                  )}
                  { !followingUser && (
                    <Button basic fluid color='green' 
                      content='Follow'
                      loading={loading}
                      onClick={handleFollowUser}                    
                    />
                  )}  
                </Reveal.Content>            
              </Reveal>
            </>
          )}  
        </Grid.Column>
      </Grid>
    </Segment>  
  )
}  