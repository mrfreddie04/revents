const functions = require("firebase-functions");

// can use admin to bypass recurity rules
const admin = require("firebase-admin");
// initialize our app (revents) for the purpose of cloud functions
admin.initializeApp(functions.config().firebase);
// get reference to firestore fb
const db = admin.firestore();
const realtime = admin.database();

exports.addFollower = functions.firestore
    .document("following/{userUid}/following/{profileId}")
    .onCreate( async (snapshot, context) => {
      const following = snapshot.data();
      console.log({following});

      try {
        // retireve document parameters from the path
        const userUid = context.params.userUid;
        const profileId = context.params.profileId;

        // get "users" document for the current user
        const userDoc = await db.collection("users").doc(userUid).get();
        // retrieve data
        const user = userDoc.data();

        // set up a batch
        const batch = db.batch();
        batch.set(
            db.collection("following").doc(profileId)
                .collection("followers").doc(userUid),
            {
              displayName: user.displayName,
              photoURL: user.photoURL,
              uid: userUid,
            },
        );
        batch.update(
            db.collection("users").doc(profileId),
            {followersCount: admin.firestore.FieldValue.increment(1)},
        );

        return await batch.commit();
      } catch (error) {
        // logged on the server
        return console.log(error);
      }
    });

exports.removeFollower = functions.firestore
    .document("following/{userUid}/following/{profileId}")
    .onDelete( async (snapshot, context) => {
      try {
        // retireve document parameters from the path
        const userUid = context.params.userUid;
        const profileId = context.params.profileId;

        // set up a batch
        const batch = db.batch();
        batch.delete(db.collection("following").doc(profileId)
            .collection("followers").doc(userUid));
        batch.update(
            db.collection("users").doc(profileId),
            {followersCount: admin.firestore.FieldValue.increment(-1)},
        );
        return await batch.commit();
      } catch (error) {
        // logged on the server
        return console.log(error);
      }
    });

exports.eventUpdated = functions.firestore
    .document("events/{eventId}")
    .onUpdate( async (snapshot, context) => {
      const eventId = context.params.eventId;
      const before = snapshot.before.data();
      const after = snapshot.after.data();
      
      if(before.attendees.length < after.attendees.length) {
        const [newAttendee] = after.attendees.filter(a => !before.attendees.some(b => b.id === a.id));
        console.log({newAttendee}); 
        try {
          const followerDocs = await db.collection("following").doc(newAttendee.id).collection("followers").get();
          const post = newPost(newAttendee, "joined-event", eventId, after);
          followerDocs.forEach( doc => {            
            realtime.ref(`posts/${doc.id}`).push(post);
          });
        } catch (error) {
          return console.log(error);
        }
      }      

      if(before.attendees.length > after.attendees.length) {
        const [oldAttendee] = before.attendees.filter(b => !after.attendees.some(a => a.id === b.id));
        console.log({oldAttendee}); 
        try {
          const followerDocs = await db.collection("following").doc(oldAttendee.id).collection("followers").get();
          const post = newPost(oldAttendee, "left-event", eventId, after);
          followerDocs.forEach( doc => {            
            realtime.ref(`posts/${doc.id}`).push(post);
          });
        } catch (error) {
          return console.log(error);
        }
      }

      return console.log("done");
    });  

function newPost(user, code, eventId, event) {
  return {
    photoURL: user.photoURL,
    date: admin.database.ServerValue.TIMESTAMP,
    code,
    displayName: user.displayName,
    eventId,
    userUid: user.id,   
    title: event.title
  }
}   