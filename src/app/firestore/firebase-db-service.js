import cuid from "cuid";
import { db, auth, Timestamp, FieldValue } from "../config/firebase";

export function listenToEventsFromFirestore() {
  //return collection reference
  return db.collection("events").orderBy('date');
}  

export function listenToEventFromFirestore(id) {
  //return document reference
  return db.collection("events").doc(id);
}  

export function addEventToFirestore(event) {
  //get reference to the collection
  //const doc = dataToSnapshot(event);

  return db.collection("events").add({
    ...event,
    hostedBy: 'Diana',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/22.jpg',
    attendees: FieldValue.arrayUnion({
      id: cuid(),
      displayName: 'Diana',
      photoURL: 'https://randomuser.me/api/portraits/women/22.jpg'
    })
  });
}

export function updateEventInFirestore(event) {
  //const doc = dataToSnapshot(event);
  return db.collection("events").doc(event.id).update(event);
}

export function deleteEventInFirestore(event) {
  return db.collection("events").doc(event.id).delete();;
}

export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled
  });
}

export function setUserProfileData(user) {
  return db.collection("users").doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: FieldValue.serverTimestamp() //Timestamp.fromDate(new Date())
  });
}

export function getUserProfile(uid) {
  //return collection reference
  return db.collection("users").doc(uid);
}  

export async function updateUserProfile(profile) {
  const user = auth.currentUser;
  //if(user.uid !== profile.id) return;
  try {
    if(user.displayName !== profile.displayName) {
      await user.updateProfile({displayName: profile.displayName});
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch(error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = auth.currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if(!userDoc.data().photoURL) {
      await userDocRef.update({photoURL: downloadURL});
      await user.updateProfile({photoURL: downloadURL});
    }
    await userDocRef.collection('photos').add({name:filename, url: downloadURL});
  } catch(error) {
    throw error;
  }  
}  

export async function deleteUserProfilePhoto(photoid) {
  const { uid } = auth.currentUser;
  try {
    await db.collection("users").doc(uid).collection('photos').doc(photoid).delete();
  } catch(error) {
    throw error;
  }  
}  

export function getUserPhotos(uid) {
  return db.collection("users").doc(uid).collection("photos");
}  

export async function setMainPhoto(photo) {
  const user = auth.currentUser;
  try {
    const userDocRef = db.collection("users").doc(user.uid);  
    await userDocRef.update({photoURL: photo.url});
    return await user.updateProfile({photoURL: photo.url});
  } catch(error) {
    throw error;
  }  
}  

export function dataToSnapshot(data) {
  //convert firebase.firestore.Timestamp to js Date type
  for (const key in data) {
    if(data.hasOwnProperty(key)) {
      if(data[key] instanceof Date) {
        data[key] = Timestamp.fromDate(data[key]);
      }  
    }  
  }

  return data;
}

export function dataFromSnapshot(doc) {
  if(!doc.exists) {
    return undefined;
  }
  
  const data = doc.data();

  //convert firebase.firestore.Timestamp to js Date type
  for (const key in data) {
    if(data.hasOwnProperty(key)) {
      if(data[key] instanceof Timestamp) {
        data[key] = data[key].toDate(); 
      }  
    }  
  }

  return { ...data, id: doc.id };
}

// export function getEventsFromFirestore(observer) {
//   //get reference to the collection
//   const ref = db.collection("events");

//   //set up onSnapshot event listener
//   const unsub = ref.onSnapshot(observer); 

//   //return function to unsubscribe on unmount
//   return unsub;
// }  
