import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Comment, Header } from 'semantic-ui-react';
import { getEventChatComments } from '../../../app/firestore/firebase-realtime-service';
import { useFirebaseCollection } from '../../../app/hooks/useFirebaseCollection';
import { eventActions } from "../event-actions";
import { createDataTree } from '../../../app/common/util/util';
import EventDetailedChatForm from './EventDetailedChatForm';
import EventComment from "./EventComment";

const { listenToEventChat, clearComments } = eventActions;

export default function EventDetailedChat({event}) {
  const dispatch = useDispatch();
  const [showReplyForm, setShowReplyForm] = useState({open:false, commentId:null});
  const { comments } = useSelector( state => state.event );
  const { authenticated } = useSelector( state => state.auth);

  useFirebaseCollection({
    ref: () => getEventChatComments(event.id), 
    data: (arr)=>dispatch(listenToEventChat(arr.reverse())), 
    deps: [dispatch, event.id],
    dispose: ()=>dispatch(clearComments()),
    shouldExecute: authenticated
  });

  const handleReplyAction = (commentId) => {
    setShowReplyForm({open:true, commentId:commentId});
  }  

  const handleCommentSubmit = () => {
    setShowReplyForm({open:false, commentId:null});
  }

  const header = authenticated ? 'Chat about this event' : 'Sign in to view and comment';

  return (
    <>
      <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{border: 'none'}}
      >
        <Header>{header}</Header>
      </Segment>

      {authenticated && (
        <Segment attached>        
          <EventDetailedChatForm eventId={event.id} parentId={0}/>
          <Comment.Group>
            {createDataTree(comments).map( comment =>(
              <Comment key={comment.id}>
                <EventComment comment={comment} eventId={event.id} parentId={comment.id} 
                  showReplyForm={showReplyForm}
                  onReply={handleReplyAction}
                  onSubmit={handleCommentSubmit}
                />

                {comment.childNodes.length > 0 && (
                <Comment.Group>
                  {comment.childNodes.reverse().map( child => (
                    <Comment key={child.id}>
                      <EventComment comment={child} eventId={event.id} parentId={child.parentId} 
                        showReplyForm={showReplyForm}
                        onReply={handleReplyAction}
                        onSubmit={handleCommentSubmit}
                      />                    
                    </Comment>
                  ))}    
                </Comment.Group>
                )}

              </Comment>
            ))}
          </Comment.Group>
        </Segment>
      )}
    </>
  )
}