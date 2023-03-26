import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Grid, Button, Header, Card, Image } from 'semantic-ui-react';
import { toast } from "react-toastify";
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';
import { getUserPhotos, setMainPhoto, deleteUserProfilePhoto } from '../../../app/firestore/firebase-db-service';
import { deletePhotoFromStorage } from '../../../app/firestore/firebase-storage-service';
import { profileActions } from "../profile-actions";
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';

const { listenToUserPhotos } = profileActions;

export default function PhotosTab({profile, isCurrentUser}) {
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState({isUpdating: false, target: null});
  const [deleting, setDeleting] = useState({isDeleting: false, target: null});
  const dispatch = useDispatch();
  const { photos } = useSelector( state => state.profile);
  const { loading } = useSelector( state => state.async);

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [dispatch, profile.id] 
  });

  const handleToggleEdit = () => setEditMode(editMode=>!editMode);

  const handleUploadCompleted = () => setEditMode(false);

  const handleSetMain = async (photo, target) => {
    setUpdating({isUpdating: true, target: target});
    try {
      await setMainPhoto(photo);
    } catch(error) {
      toast.error(error.message);
    } finally {
      setUpdating({isUpdating: false, target: null})
    }
  }

  const handleDelete = async (photo, target) => {
    setDeleting({isDeleting: true, target: target});
    try {
      await deletePhotoFromStorage(photo.name);
      await deleteUserProfilePhoto(photo.id);
    } catch(error) {
      toast.error(error.message);
    } finally {
      setDeleting({isDeleting: false, target: null})
    }
  }  

  return (
    <Tab.Pane loading={loading }>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`Photos`}/>
          {isCurrentUser && (
            <Button floated='right' basic 
              onClick={handleToggleEdit} 
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          )}  
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode && <PhotoUploadWidget onUploadCompleted={handleUploadCompleted}/>} 
          {!editMode && (
            <Card.Group itemsPerRow={5}>
              {photos.map( photo =>(
                <Card key={photo.id}>
                  <Image src={photo.url}/>
                  <Button.Group fluid widths={2}>
                    <Button 
                      name={photo.id}
                      loading={updating.isUpdating && updating.target === photo.id}
                      disabled={photo.url === profile.photoURL}
                      basic 
                      color='green' 
                      content='Main' 
                      onClick={(e)=>handleSetMain(photo, e.target.name)}
                    />
                    <Button 
                      name={photo.id}
                      loading={deleting.isDeleting && deleting.target === photo.id}
                      disabled={photo.url === profile.photoURL}
                      basic 
                      color='red' 
                      icon='trash' 
                      onClick={(e)=>handleDelete(photo, e.target.name)}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )} 
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
} 