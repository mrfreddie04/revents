import { ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage, auth } from "../config/firebase";

export function uploadPhotoToStorage(file, filename) {
  const user = auth.currentUser;
  const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
  return uploadBytesResumable(storageRef, file);
  //const storageRef = storage.ref();
  //return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function deletePhotoFromStorage(filename) {
  const user = auth.currentUser;
  //const storageRef = storage.ref();
  const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
  return deleteObject(storageRef);  
  // const photoRef = storageRef.child(`${user.uid}/user_images/${filename}`);
  // return photoRef.delete();
}