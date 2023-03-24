import cuid from "cuid";
import { db, Timestamp, FieldValue } from "../config/firebase";

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
