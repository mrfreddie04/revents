import React, { useState } from "react";
import { format } from 'date-fns';
import { Tab, Grid, Button, Header } from 'semantic-ui-react';
import ProfileForm from "./ProfileForm";

export default function AboutTab({profile, isCurrentUser}) {
  const [editMode, setEditMode] = useState(false);
  const { displayName, createdAt, description} = profile;

  const handleSetEdit = () => setEditMode(editMode=>!editMode);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`About ${displayName}`}/>
          {isCurrentUser && (
            <Button floated='right' basic 
              onClick={handleSetEdit} 
              content={editMode ? 'Cancel' : 'Edit'}
            />
          )}  
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode && <ProfileForm profile={profile}/>} 
          {!editMode && (
            <div style={{marginBottom:'10px'}}>
              <strong>Member since: {format(createdAt,'dd MMM yyyy')}</strong>
              <div>{description || null}</div>
            </div>
          )} 
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
} 