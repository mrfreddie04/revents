import { realtime, auth } from "../config/firebase";

export function addEventChatComment(eventid, parentId, comment) {
  const user = auth.currentUser; 
  const newComment = {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    eventid: eventid,
    text: comment,
    date: Date.now(),
    parentId: parentId 
  }
  return realtime.ref(`chat/${eventid}`).push(newComment);
}

export function getEventChatComments(eventid) {
  //console.log("GECC",eventid);
  return realtime.ref(`chat/${eventid}`).orderByKey();
}  

export function getUserFeed() {
  const user = auth.currentUser; 
  return realtime.ref(`posts/${user.uid}`).orderByKey().limitToLast(5);
}  

export function firebaseObjectToArray(snapshot) {
  return Object.entries(snapshot.val()).map(([key,value]) => {
    return {...value, id:key};
  });
}