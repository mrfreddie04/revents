import { db, auth, Timestamp, FieldValue } from "../config/firebase";

export function fetchEventsFromFirestore(predicate, limit = 2, lastDocSnaphot = null) {
  const user = auth.currentUser;
  const filter = predicate.get('filter');
  const startDate = predicate.get('startDate');

  //return collection reference
  const eventsRef = db.collection("events").orderBy('date').startAfter(lastDocSnaphot).limit(limit); 
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
  //const today = new Date();

  const userDocRef = db.collection("users").doc(user.uid);  
  const eventHostingQuery = getUserEvents(user.uid,'hosting');
  const eventAttendsQuery = getUserEvents(user.uid,'future');
  const userFollowingRef = getFollowing(user.uid);
  const userFollowersRef = getFollowers(user.uid);

  const batch = db.batch();

  try {
    batch.update(
      userDocRef,
      { photoURL: photo.url} 
    );

    //events hosted by the user
    const eventHostingCollSnap = await eventHostingQuery.get();
    eventHostingCollSnap.docs.forEach((doc) => {
      batch.update(
        doc.ref,//db.collection("events").doc(doc.id),
        {hostPhotoURL: photo.url}
      );  
    });

    //future events attended by the user
    const eventAttendsCollSnap = await eventAttendsQuery.get();
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
    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach(doc => {
      const follower = getFollowers(doc.id).doc(user.uid);
      batch.update(
        follower,//db.collection("following").doc(doc.id).collection("followers").doc(user.uid),
        {photoURL: photo.url}
      );  
    });    

    //followers of the user - user shows up as a member of following collection for each of these followers
    const userFollowersSnap = await userFollowersRef.get();
    userFollowersSnap.docs.forEach(doc => {
      const following = getFollowing(doc.id).doc(user.uid);
      batch.update(
        following,//db.collection("following").doc(doc.id).collection("followers").doc(user.uid),
        {photoURL: photo.url}
      );  
    });    

    await batch.commit();
    //need to update events & following collections
    //cannot place inside a batch, as it is an update to the auth service
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

export async function followUser(profile) {
  const user = auth.currentUser;
  const batch = db.batch();
  //current user is following profile user
  try {
    batch.set(
      db.collection("following").doc(user.uid).collection("following").doc(profile.id),
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
      db.collection("users").doc(user.uid),
      { followingCount: FieldValue.increment(1) }
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
  const batch = db.batch();
  //current user is following profile user
  try {
    batch.delete(db.collection("following").doc(user.uid).collection("following").doc(profile.id));
    //batch.delete(db.collection("following").doc(profile.id).collection("followers").doc(user.uid));
    batch.update(
      db.collection("users").doc(user.uid),
      { followingCount: FieldValue.increment(-1) }
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
  return db.collection("following").doc(profileId).collection("followers");
}  

export function getFollowing(profileId) {
  return db.collection("following").doc(profileId).collection("following");
}  

export async function isFollowing(profileId) {
  const user = auth.currentUser;
  try {
    const doc = await db.collection("following").doc(user.uid).collection("following").doc(profileId).get();
    return doc.exists;
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

// export function getEventsFromFirestore(observer) {
//   //get reference to the collection
//   const ref = db.collection("events");

//   //set up onSnapshot event listener
//   const unsub = ref.onSnapshot(observer); 

//   //return function to unsubscribe on unmount
//   return unsub;
// }  
