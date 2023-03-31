import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { setUserProfileData } from "./firebase-db-service";

export function signInWithEmail(creds) {
  return signInWithEmailAndPassword(auth, creds.email, creds.password);
}

export async function registerWithEmail(creds) {
  const {email, password, displayName } = creds;
  try {
    //create user
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    //update user profile - in auth service
    await updateProfile(user, {
      displayName: displayName
    });
    //add user profile is firestore db
    await setUserProfileData(user);
    //return;
  } catch(error) {
    throw error;
  }
}

export function signOutDb() {
  return signOut(auth);
}

export function updateUserPassword(creds) {
  //get current user
  const user = auth.currentUser; //synchronous from local storage
  return updatePassword(user, creds.password);
}

export async function socialLogin(selectedProvider) {
  let provider;
  if(selectedProvider === 'facebook') {
    provider = new FacebookAuthProvider();
  }
  if(selectedProvider === 'google') {
    provider = new GoogleAuthProvider();
  }  

  try {
    //authenticate client using popup based authentication
    const result = await signInWithPopup(auth, provider);
    console.log(result);

    if (result._tokenResponse.isNewUser) {
      await setUserProfileData(result.user);
    }

  } catch(error) {
    throw error;    
  }
}