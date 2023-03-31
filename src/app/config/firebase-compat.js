//import firebase CORE
import firebase from "firebase/compat/app"; 

//import services we want to use
import "firebase/compat/firestore";    //firestore database
import "firebase/compat/database";     //realtime database - we will use for chat
import "firebase/compat/auth";         //firestore authentication services
import "firebase/compat/storage";      //firebase storage

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "revents-db-46d95.firebaseapp.com",
  projectId: "revents-db-46d95",
  storageBucket: "revents-db-46d95.appspot.com",
  messagingSenderId: "967937542945",
  appId: "1:967937542945:web:8d09cda35d07c8befd4c60"
};

// Initialize Firebase - connects to firebase backend (in the cloud)
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services that we want to use
// It returns an object we can use to interact with Firebase services
const db = firebase.firestore(); //firestore (db)
const realtime = firebase.database(); //realtime (db)
const auth = firebase.auth(); //Authentication
const storage = firebase.storage(); //Storage


//timestamp - alias for firebase.firestore.Timestamp function
//it created timestamp data property
const Timestamp = firebase.firestore.Timestamp;
const FieldValue = firebase.firestore.FieldValue;
const FacebookAuthProvider =  firebase.auth.FacebookAuthProvider
const GoogleAuthProvider =  firebase.auth.GoogleAuthProvider

export default firebase;
export { 
  db, realtime, auth, storage, 
  Timestamp, FieldValue, FacebookAuthProvider, GoogleAuthProvider 
};