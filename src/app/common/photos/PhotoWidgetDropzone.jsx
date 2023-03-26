import React, { useCallback } from "react";
import { Header, Icon } from 'semantic-ui-react';
import { useDropzone} from 'react-dropzone';

const dropzoneStyles = {
  border: 'dashed 3px #eee',
  borderRadius: '5%',
  paddingTop: '30px',
  textAlign: 'center'
};

const dropzoneActive = {
  border: 'dashed 3px green'
};

export default function PhotoWidgetDropzone({onDropFiles}) {

  const onDrop = useCallback( acceptedFiles => {
    //console.log("Accepted files", acceptedFiles);
    onDropFiles(acceptedFiles.map( file => ({...file, preview: URL.createObjectURL(file)}) ))
  },[onDropFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dropzoneStyles,...dropzoneActive} : dropzoneStyles}>
      <input {...getInputProps()}/>
      <Icon name='upload' size='huge'/>
      <Header content='Drop image here'/>
    </div>
  )
}  