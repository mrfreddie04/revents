import {
  collection,
  Timestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  updateDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  serverTimestamp,
  increment,
  writeBatch,
  limit,
  startAfter
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from "../config/firebase";

export function fetchEventsFromFirestore(filter, startDate, pageSize = 2, lastDocSnaphot = null) {
  const user = auth.currentUser;

  //return collection reference
  const q = query(collection(db, "events"), orderBy('date'), startAfter(lastDocSnaphot), limit(pageSize)); 
  switch(filter) {
    case 'isHosting':
      return query(q,
        where('hostUid', '==', user.uid),
        where('date', '>=', startDate))
    case 'isGoing':  
      return query(q,
        where("attendeeIds", "array-contains", user.uid),
        where('date', '>=', startDate))
    default:
      return query(q,where('date', '>=', startDate));  
  }
}  

export function getUserEvents(uid, filter) {
  const eventsRef = collection(db, "events");
  const today = new Date();
  switch(filter) {
    case 'future':
      return query(eventsRef,
        where("attendeeIds", "array-contains", uid),
        where('date', '>', today),
        orderBy('date'));
    case 'past':  
      return query(eventsRef,
        where("attendeeIds", "array-contains", uid),
        where('date', '<=', today),
        orderBy('date', 'desc'));
    case 'hosting':
      return query(eventsRef,
        where('hostUid', '==', uid),
        orderBy('date'));
    default:
      return query(eventsRef);  
  }  
}  

export function listenToEventFromFirestore(id) {
  //return document reference
  return doc(db, "events", id);
}  

export function addEventToFirestore(event) {
  const user = auth.currentUser;
  return addDoc(collection(db,"events"), {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null
    }),
    attendeeIds: arrayUnion(user.uid)  
  });
}

export function updateEventInFirestore(event) {
  //const doc = dataToSnapshot(event);
  const eventDoc = doc(db, "events", event.id);
  return updateDoc(eventDoc, event);
}

export function deleteEventInFirestore(event) {
  const eventDoc = doc(db, "events", event.id);
  return deleteDoc(eventDoc);
}

export function cancelEventToggle(event) {
  const eventDoc = doc(db, "events", event.id);
  return updateDoc(eventDoc, {
    isCancelled: !event.isCancelled
  });
}

export function setUserProfileData(user) {
  const userDoc = doc(db, "users", user.uid);
  return setDoc( userDoc, {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: serverTimestamp() //Timestamp.fromDate(new Date())
  });
}

export function getUserProfile(uid) {
  //return collection reference
  return doc(db, "users", uid);
}  

export async function updateUserProfile(profile) {
  const user = auth.currentUser;

  try {
    if(user.displayName !== profile.displayName) {
      await updateProfile(user, {displayName: profile.displayName});
    }
    return await updateDoc(doc(db, "users", user.uid), profile);
  } catch(error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = auth.currentUser;
  const userDocRef = doc(db, "users", user.uid);
  try {
    const userDoc = await getDoc(userDocRef);
    if(!userDoc.data().photoURL) {
      await updateDoc(userDocRef, {photoURL: downloadURL});
      await updateProfile(user, {photoURL: downloadURL});
    }
    await addDoc(
      collection(db, "users", user.uid, 'photos'), 
      {name:filename, url: downloadURL}
    );
  } catch(error) {
    throw error;
  }  
}  

export async function deleteUserProfilePhoto(photoid) {
  const { uid } = auth.currentUser;
  try {
    await deleteDoc(doc(db, "users", uid, 'photos', photoid));
  } catch(error) {
    throw error;
  }  
}  

export function getUserPhotos(uid) {
  return collection(db, "users", uid, "photos");
}  

export async function setMainPhoto(photo) {
  const user = auth.currentUser;
  //const today = new Date();

  const userDocRef = doc(db, "users", user.uid);  
  const eventHostingQuery = getUserEvents(user.uid,'hosting');
  const eventAttendsQuery = getUserEvents(user.uid,'future');
  const userFollowingRef = getFollowing(user.uid);
  const userFollowersRef = getFollowers(user.uid);

  const batch = writeBatch(db);

  try {
    batch.update(
      userDocRef,
      { photoURL: photo.url} 
    );

    //events hosted by the user
    const eventHostingCollSnap = await getDocs(eventHostingQuery);
    eventHostingCollSnap.docs.forEach((doc) => {
      batch.update(
        doc.ref,//db.collection("events").doc(doc.id),
        {hostPhotoURL: photo.url}
      );  
    });

    //future events attended by the user
    const eventAttendsCollSnap = await getDocs(eventAttendsQuery);
    eventAttendsCollSnap.docs.forEach((doc) => {
      const attendees = doc.data().attendees;
      batch.update(
        doc.ref, //db.collection("events").doc(doc.id),
        {attendees: attendees.map(attendee => attendee.id === user.uid 
            ? {...attendee, photoURL: photo.url}
            : attendee)}
      );  
    });

    //profiles followed by the user - user shows up as a member of followers collection for each of these profiles
    const userFollowingSnap = await getDocs(userFollowingRef);
    userFollowingSnap.docs.forEach(docRef => {
      const followerDocRef = doc(db, "following", docRef.id, "followers", user.uid);
      batch.update(
        followerDocRef,//db.collection("following").doc(doc.id).collection("followers").doc(user.uid),
        {photoURL: photo.url}
      );  
    });    

    //followers of the user - user shows up as a member of following collection for each of these followers
    const userFollowersSnap = await getDocs(userFollowersRef);
    userFollowersSnap.docs.forEach(docRef => {
      //const following = getFollowing(doc.id).doc(user.uid);
      const followingDocRef = doc(db, "following", docRef.id, "following", user.uid);
      batch.update(
        followingDocRef,//db.collection("following").doc(doc.id).collection("followers").doc(user.uid),
        {photoURL: photo.url}
      );  
    });    

    await batch.commit();
    //need to update events & following collections
    //cannot place inside a batch, as it is an update to the auth service
    return await updateProfile(user, {photoURL: photo.url});
  } catch(error) {
    throw error;
  }  
}  

export function addEventAttendee(event) {
  const user = auth.currentUser;
  const eventDocRef = doc(db, "events", event.id);
  return updateDoc(eventDocRef, {
    attendees: arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null
    }),
    attendeeIds: arrayUnion(user.uid)  
  });
}

export async function removeEventAttendee(event) {
  const user = auth.currentUser;
  const eventDocRef = doc(db, "events", event.id);
  try {
    const eventDoc = await getDoc(eventDocRef);
    return updateDoc( eventDocRef, {
      attendees: eventDoc.data().attendees.filter(a => a.id !== user.uid),
      attendeeIds: arrayRemove(user.uid)  
    });
  } catch(error) {
    throw error;
  }
}

export async function followUser(profile) {
  const user = auth.currentUser;
  const batch = writeBatch(db);
  //current user is following profile user
  try {
    batch.set(
      doc(db, "following", user.uid, "following", profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id
      }
    );
    // batch.set(
    //   db.collection("following").doc(profile.id).collection("followers").doc(user.uid),
    //   {
    //     displayName: user.displayName,
    //     photoURL: user.photoURL,
    //     uid: user.uid
    //   }
    // );
    batch.update(
      doc(db, "users", user.uid),
      { followingCount: increment(1) }
    );
    // batch.update(
    //   db.collection("users").doc(profile.id),
    //   { followersCount: FieldValue.increment(1) }  
    // );    
    return await batch.commit();
  } catch (error) {
    //automatic rollback
    throw error;
  }
}

export async function unfollowUser(profile) {
  const user = auth.currentUser;
  const batch = writeBatch(db);
  //current user is following profile user
  try {
    batch.delete(doc(db, "following", user.uid, "following", profile.id));
    //batch.delete(db.collection("following").doc(profile.id).collection("followers").doc(user.uid));
    batch.update(
      doc(db, "users", user.uid),
      { followingCount: increment(-1) }
    );
    // batch.update(
    //   db.collection("users").doc(profile.id),
    //   { followersCount: FieldValue.increment(-1) }  
    // );  
    return await batch.commit();    
    // await db.collection("following").doc(user.uid).collection("following").doc(profile.id).delete();
    // await db.collection("following").doc(profile.id).collection("followers").doc(user.uid).delete();
    // await db.collection("users").doc(user.uid).update({
    //   followingCount: FieldValue.increment(-1)
    // });
    // await db.collection("users").doc(profile.id).update({
    //   followersCount: FieldValue.increment(-1)
    // });    
  } catch (error) {
    throw error;
  }
}

export function getFollowers(profileId) {
  return collection(db, "following", profileId, "followers");
}  

export function getFollowing(profileId) {
  return collection(db, "following", profileId, "following");
}  

export async function isFollowing(profileId) {
  const user = auth.currentUser;
  try {
    const profileDoc = await getDoc(doc(db, "following", user.uid, "following", profileId));
    return profileDoc.exists;
  } catch (error) {
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
