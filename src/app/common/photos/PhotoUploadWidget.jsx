import React, { useState } from "react";
import cuid from "cuid";
import { Header, Grid, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { uploadPhotoToStorage } from '../../firestore/firebase-storage-service';
import { updateUserProfilePhoto } from '../../firestore/firebase-db-service';
import { getFileExtension } from "../util/util";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

export default function PhotoUploadWidget({onUploadCompleted}) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDropFiles = (files) => {
    setFiles(files);
  }

  const handleCreateImage = (blob) => {
    setImage(blob);
  }

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  }

  const handleUploadImage = async () => {
    setLoading(true);
    const filename = cuid() + '.' + getFileExtension(files[0].path);
    const uploadTask = uploadPhotoToStorage(image, filename); 
    uploadTask.on('state_changed', 
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      error => {
        setLoading(false);
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then( url => {
            return updateUserProfilePhoto(url, filename)
          })
          .then(() => {
            setLoading(false);
            handleCancelCrop();
            onUploadCompleted();
          })
          .catch(error => {
            setLoading(false);
            toast.error(error.message);
          })
      }
    );
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 1 - Add Photo'/>
        <PhotoWidgetDropzone onDropFiles={handleDropFiles}/>
      </Grid.Column>      
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 2 - Resize'/>
        {files.length>0 && (
          <PhotoWidgetCropper url={files[0].preview} onCreateImage={handleCreateImage}/>
        )}
      </Grid.Column>        
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 3 - Preview & Upload'/>
        {files.length>0 && (
          <>
            <div className="img-preview" style={{minHeight:200, minWidth:200, overflow:'hidden'}}/>
            <Button.Group fluid>
              <Button 
                loading={loading}
                positive icon='check' style={{width: 100}} onClick={handleUploadImage}
              />
              <Button 
                disabled={loading}
                icon='close' style={{width: 100}} onClick={handleCancelCrop}
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>          
    </Grid>
  )
}  


//style={{width: 100}} 