import { storage, auth } from "../config/firebase";

export function uploadPhotoToStorage(file, filename) {
  const user = auth.currentUser;
  const storageRef = storage.ref();
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

export function deletePhotoFromStorage(filename) {
  const user = auth.currentUser;
  const storageRef = storage.ref();
  const photoRef = storageRef.child(`${user.uid}/user_images/${filename}`);
  return photoRef.delete();
}