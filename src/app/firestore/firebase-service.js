import { toast } from "react-toastify";
import { auth, GoogleAuthProvider, FacebookAuthProvider } from "../config/firebase";
import { setUserProfileData } from "./firestore-service";

export function signInWithEmail(creds) {
  return auth.signInWithEmailAndPassword(creds.email, creds.password);
}

export async function registerWithEmail(creds) {
  const {email, password, displayName } = creds;
  try {
    //create user
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    //update user profile - in auth service
    await user.updateProfile({
      displayName: displayName
    });
    //add user profile is firestore db
    await setUserProfileData(user);
    //return;
  } catch(error) {
    throw error;
  }
}

export function signOut() {
  return auth.signOut();
}

export function updateUserPassword(creds) {
  //get current user
  const user = auth.currentUser; //synchronous from local storage
  return user.updatePassword(creds.password);
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
    const result = await auth.signInWithPopup(provider);
    console.log(result);
    
    if(result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch(error) {
    toast.error(error.message);
  }
}