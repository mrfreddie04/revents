import React from "react";
import EventListItem from "./EventListItem";
//import { Grid } from 'semantic-ui-react';

export default function EventList({events, onSelectEvent, onDeleteEvent}) {

  return(    
    <>
      {events.map(event => (
        <EventListItem key={event.id} event={event} onSelectEvent={onSelectEvent} onDeleteEvent={onDeleteEvent}/>
      ))}
    </>
  );
};