//import firebase CORE
import firebase from "firebase/compat/app"; 

//import services we want to use
import "firebase/compat/firestore";    //firestore database
import "firebase/compat/database";     //realtime database - we will use for chat
import "firebase/compat/auth";         //firestore authentication services
import "firebase/compat/storage";      //firebase storage

const firebaseConfig = {
  apiKey: "AIzaSyDalMkLk4zEtSwZIBGIMH7yPct7JupSfr0",
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
const projectDatabase = firebase.database(); //realtime (db)
const projectAuth = firebase.auth(); //Authentication
const projectStorage = firebase.storage(); //Storage

//timestamp - alias for firebase.firestore.Timestamp function
//it created timestamp data property
const Timestamp = firebase.firestore.Timestamp;
const FieldValue = firebase.firestore.FieldValue;

export default firebase;
export { db, projectDatabase, projectAuth, projectStorage, Timestamp, FieldValue };