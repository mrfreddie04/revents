import React, { useState } from "react";
import { Grid } from 'semantic-ui-react';
import EventList from "./EventList";
import EventForm from "../event-form/EventForm";
import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard({formOpen, selectedEvent, onFormClose, onSelectEvent}) {
  const [events, setEvents] = useState(sampleData);

  const handleEventCreate = (event) => {
    //console.log(event);
    setEvents(events => ([...events, event]));
  }

  const handleEventUpdate = (event) => {
    setEvents(events => events.map( el => (el.id === event.id ? event : el )));
  }

  const handleEventDelete = (event) => {
    setEvents(events => events.filter( el => el.id !== event.id ));
  }

  return(    
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} onSelectEvent={onSelectEvent} onDeleteEvent={handleEventDelete}/>
      </Grid.Column>
      <Grid.Column width={6}>
        { formOpen && (
          <EventForm 
            key={selectedEvent?.id}
            selectedEvent={selectedEvent} 
            onFormClose={onFormClose} 
            onEventCreate={handleEventCreate}
            onEventUpdate={handleEventUpdate}
          />
        )}
      </Grid.Column>      
    </Grid>
  );
};