import { ref , push, query, orderByKey, limitToLast } from 'firebase/database';
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
  return push(ref(realtime, `chat/${eventid}`), newComment);
  //return realtime.ref(`chat/${eventid}`).push(newComment);
}

export function getEventChatComments(eventid) {
  return query(ref(realtime, `chat/${eventid}`), orderByKey())
  //return realtime.ref(`chat/${eventid}`).orderByKey();
}  

export function getUserFeed() {
  const user = auth.currentUser; 
  if(!user) return;
  return query(ref(realtime, `posts/${user.uid}`), orderByKey(), limitToLast(5))
  //return realtime.ref(`posts/${user.uid}`).orderByKey().limitToLast(5);
}  

export function firebaseObjectToArray(snapshot) {
  if(snapshot) {
    return Object.entries(snapshot).map(([key,value]) => {
      return {...value, id:key};
    });
  }
}