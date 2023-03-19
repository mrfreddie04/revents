import React, { useState } from "react";
import { Grid } from 'semantic-ui-react';
import EventList from "./EventList";
import EventForm from "../event-form/EventForm";
import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard({formOpen, onFormClose}) {
  const [events, setEvents] = useState(sampleData);

  return(    
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        { formOpen && <EventForm onFormClose={onFormClose}/> }
      </Grid.Column>      
    </Grid>
  );
};