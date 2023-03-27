import { db, auth, Timestamp, FieldValue } from "../config/firebase";

export function listenToEventsFromFirestore(predicate) {
  const user = auth.currentUser;
  const filter = predicate.get('filter');
  const startDate = predicate.get('startDate');

  //return collection reference
  const eventsRef = db.collection("events").orderBy('date'); //.orderBy('date'); //
  switch(filter) {
    case 'isHosting':
      return eventsRef
        .where('hostUid', '==', user.uid)
        .where('date', '>=', startDate);
    case 'isGoing':  
      return eventsRef
        .where("attendeeIds", "array-contains", user.uid)
        .where('date', '>=', startDate);
    default:
      return eventsRef.where('date', '>=', startDate);  
  }
}  

export function getUserEvents(uid, filter) {
  const eventsRef = db.collection("events");
  const today = new Date();
  switch(filter) {
    case 'future':
      return eventsRef
        .where("attendeeIds", "array-contains", uid)
        .where('date', '>', today)
        .orderBy('date');
    case 'past':  
      return eventsRef
        .where("attendeeIds", "array-contains", uid)
        .where('date', '<=', today)
        .orderBy('date', 'desc');
    case 'hosting':
      return eventsRef
        .where('hostUid', '==', uid)
        .orderBy('date');
    default:
      return eventsRef;  
  }  
}  

export function listenToEventFromFirestore(id) {
  //return document reference
  return db.collection("events").doc(id);
}  

export function addEventToFirestore(event) {
  const user = auth.currentUser;
  return db.collection("events").add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null
    }),
    attendeeIds: FieldValue.arrayUnion(user.uid)  
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

export function addEventAttendee(event) {
  const user = auth.currentUser;
  const eventDocRef = db.collection("events").doc(event.id);
  return eventDocRef.update({
    attendees: FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null
    }),
    attendeeIds: FieldValue.arrayUnion(user.uid)  
  });
}

export async function removeEventAttendee(event) {
  const user = auth.currentUser;
  const eventDocRef = db.collection("events").doc(event.id);
  try {
    const eventDoc = await eventDocRef.get();
    return eventDocRef.update({
      attendees: eventDoc.data().attendees.filter(a => a.id !== user.uid),
      attendeeIds: FieldValue.arrayRemove(user.uid)  
    });
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
