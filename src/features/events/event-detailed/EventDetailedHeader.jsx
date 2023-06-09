import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { Segment, Item, Header, Image, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import { addEventAttendee, removeEventAttendee } from "../../../app/firestore/firebase-db-service";
import UnauthModal from "../../auth/UnauthModal";

const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

export default function EventDetailedHeader({event, isGoing, isHost}) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { authenticated } = useSelector( state => state.auth);

  const handleModalClose = () => {
    setModalOpen(false); 
  }

  const handleJoinEvent = async () => {
    if(!authenticated) {
      setModalOpen(true);
      return;
    }
    setLoading(true);  
    try {
      await addEventAttendee(event);
      setLoading(false);
    } catch(error) {
      toast.error(error.message);
      setLoading(false);
    } 
  }

  const handleCancelAttendance = async () => {
    setLoading(true);  
    try {
      await removeEventAttendee(event);
      setLoading(false);
    } catch(error) {
      toast.error(error.message);
      setLoading(false);
    } 
  }

  return (
    <>
      {modalOpen && (<UnauthModal onModalClose={handleModalClose}/>)}
      <Segment.Group>
        <Segment basic attached="top" style={{padding: '0'}}>
          <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle}/>

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{color: 'white'}}
                  />
                  <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                  <p>
                    Hosted by <strong><Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom" clearing>
          {!isHost && isGoing && (
            <Button 
              loading={loading}
              disabled={loading}
              onClick={handleCancelAttendance}
              content='Cancel My Place'
            />
          )}
          {!isHost && !isGoing && (
            <Button 
              color="teal" 
              loading={loading}
              disabled={loading}
              onClick={handleJoinEvent}
              content='JOIN THIS EVENT'
            />
          )}  
          {isHost && (
            <Button 
              color="orange" 
              floated="right" 
              as={Link} 
              to={`/manage/${event.id}`} 
              content='Manage Event'
            />
          )}
        </Segment>
      </Segment.Group>
    </>
  )
}