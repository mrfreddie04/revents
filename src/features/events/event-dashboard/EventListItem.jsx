import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

export default function EventListItem({event, onSelectEvent, onDeleteEvent}) {

  const handleViewClick = () => {
    onSelectEvent(event);
  }

  const handleDeleteClick = () => {
    onDeleteEvent(event);
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
          <Icon name='clock'/> {new Date(event.date).toLocaleDateString()}
          <Icon name='marker'/> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees && event.attendees.map(attendee => (<EventListAttendee key={attendee.id} attendee={attendee}/>))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button color='teal' floated='right' content='View' onClick={handleViewClick}/>
        <Button color='red' floated='right' content='Delete' onClick={handleDeleteClick}/>
      </Segment>      
    </Segment.Group>
  );
};