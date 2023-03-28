import React from "react";
import { Link } from "react-router-dom";
import { Comment } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import EventDetailedChatForm from './EventDetailedChatForm';

export default function EventComment({comment, eventId, parentId, onReply, onSubmit, showReplyForm}) {
  return (
    <>
      <Comment.Avatar src={comment.photoURL || "/assets/user.png"}/>
      <Comment.Content>
        <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
        <Comment.Metadata>
          <div>{formatDistance(comment.date, new Date())}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.text.split('\n').map((text,i)=>(
          <span key={i}>{text}<br/></span>
        ))}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={()=>onReply(comment.id)}>Reply</Comment.Action>
          {showReplyForm.open && showReplyForm.commentId === comment.id && (
            <EventDetailedChatForm 
              eventId={eventId} 
              parentId={parentId} 
              onCommentSubmit={onSubmit}
            />
          )}
        </Comment.Actions>
      </Comment.Content>    
    </>
  )
}  