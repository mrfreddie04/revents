import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import { eventActions } from '../event-actions';
import EventListAttendee from './EventListAttendee';

export default function EventListItem({event}) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(eventActions.deleteEvent(event));
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
        <Button as={Link} to={`/events/${event.id}`}
          color='teal' floated='right' content='View' 
        />
        <Button color='red' floated='right' content='Delete' onClick={handleDeleteClick}/>
      </Segment>      
    </Segment.Group>
  );
};