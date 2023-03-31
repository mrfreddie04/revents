//import firebase CORE
import { initializeApp } from "firebase/app";  

// import services we want to use
//firestore database
import { getFirestore } from "firebase/firestore";
//firestore authentication services
import { getAuth } from "firebase/auth";          
import { getStorage } from "firebase/storage";    //firebase storage
import { getDatabase } from "firebase/database";  //realtime database - we will use for chat

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "revents-db-46d95.firebaseapp.com",
  projectId: "revents-db-46d95",
  storageBucket: "revents-db-46d95.appspot.com",
  messagingSenderId: "967937542945",
  appId: "1:967937542945:web:8d09cda35d07c8befd4c60"
};

// Initialize Firebase - connects to firebase backend (in the cloud)
const app = initializeApp(firebaseConfig);

// Initialize Firebase services that we want to use
// It returns an object we can use to interact with Firebase services
const db = getFirestore(app);  //firestore (db)
const realtime = getDatabase(app); //realtime (db)
const auth = getAuth(app); //Authentication
const storage = getStorage(app); //Storage

//timestamp - alias for firebase.firestore.Timestamp function

export { 
  app, db, realtime, auth, storage
};