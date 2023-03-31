import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PhotoWidgetCropper({url, onCrop /*, onCreateImage*/}) {
  const cropperRef = useRef(null);

  // const handleCrop = () => {
  //   const cropper = cropperRef.current?.cropper;
  //   if(cropper) {
  //     cropper.getCroppedCanvas().toBlob( blob => {
  //       onCreateImage(blob);
  //     }, 'image/jpeg');
  //   }
  // }

  const handleCrop = () => {
    onCrop(cropperRef.current?.cropper);
  }  
  
  return (
    <Cropper
      ref={cropperRef}
      src={url}
      style={{height:200, width:'100%'}}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={handleCrop}    
    />
  )
}  