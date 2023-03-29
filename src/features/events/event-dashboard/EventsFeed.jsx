import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Feed, Segment } from 'semantic-ui-react';
import { getUserFeed } from '../../../app/firestore/firebase-realtime-service';
import { useFirebaseCollection } from '../../../app/hooks/useFirebaseCollection';
import { profileActions } from "../../profiles/profile-actions";
import EventFeedItem from "./EventFeedItem";

const { listenToUserFeed } = profileActions;

export default function EventsFeed() {
  const dispatch = useDispatch();
  const { feed } = useSelector( state => state.profile );

  useFirebaseCollection({
    ref: getUserFeed, 
    data: (arr)=>dispatch(listenToUserFeed(arr.reverse())), 
    deps: [dispatch]
  });

  return(    
    <>
      <Header attached color='teal' icon='newspaper' content='News feed'/>
      <Segment attached='bottom'>
        <Feed>
          {feed.map((post) => (<EventFeedItem key={post.id} post={post}/>)) }
        </Feed>
      </Segment>
    </>
  );
};