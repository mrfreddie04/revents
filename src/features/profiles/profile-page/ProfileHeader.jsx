import React from "react";
// import { Link, useHistory } from "react-router-dom";
// import { useSelector } from 'react-redux';
import { Segment, Grid, Item, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';
// import { toast } from 'react-toastify';
// import { authActions } from '../../features/auth/auth-actions';
// import { signOut } from "../../app/firestore/firebase-auth-service";

//const { signOutUser } = authActions;

export default function ProfileHeader({profile, isCurrentUser}) {

  const {displayName, photoURL} = profile;

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
            <Statistic label='Followers' value={10}/>
            <Statistic label='Following' value={5}/>
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider/>
              <Reveal animated='move'>
                <Reveal.Content visible style={{width:'100%'}}>
                  <Button fluid color='teal' content='Following'/>
                </Reveal.Content>
                <Reveal.Content hidden style={{width:'100%'}}>
                  <Button basic fluid color='red' content='Unfollow'/>
                </Reveal.Content>            
              </Reveal>
            </>
          )}  
        </Grid.Column>
      </Grid>
    </Segment>  
  )
}  