import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import EventListAttendee from './EventListAttendee';
import { deleteEventInFirestore } from "../../../app/firestore/firestores-service";

export default function EventListItem({event}) {

  const handleDeleteClick = async () => {
    await deleteEventInFirestore(event);
  }

  return(    
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={event.hostPhotoURL || '/assets/user.png'}/>
            <Item.Content>
              <Item.Header content={event.title}/>
              <Item.Description content={`Hosted by ${event.hostedBy}`}/>
              {event.isCancelled && (
                <Label 
                  style={{top:'-40px'}} 
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock'/> {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name='marker'/> {event.venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees && event.attendees.map(attendee => (<EventListAttendee key={attendee.id} attendee={attendee}/>))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button color='red' floated='right' content='Delete' onClick={handleDeleteClick}/>
        <Button as={Link} to={`/events/${event.id}`}
          color='teal' floated='right' content='View' 
        />
      </Segment>      
    </Segment.Group>
  );
};