import React, { useState } from "react";
import { Grid } from 'semantic-ui-react';
import EventList from "./EventList";
import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard() {
  const [events, setEvents] = useState(sampleData);

  // const handleEventCreate = (event) => {
  //   //console.log(event);
  //   setEvents(events => ([...events, event]));
  // }

  // const handleEventUpdate = (event) => {
  //   setEvents(events => events.map( el => (el.id === event.id ? event : el )));
  // }

  const handleEventDelete = (event) => {
    setEvents(events => events.filter( el => el.id !== event.id ));
  }

  return(    
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} onDeleteEvent={handleEventDelete}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>      
    </Grid>
  );
};