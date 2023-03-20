import React from "react";
import EventListItem from "./EventListItem";
//import { Grid } from 'semantic-ui-react';

export default function EventList({events}) {

  return(    
    <>
      {events.map(event => (
        <EventListItem key={event.id} event={event}/>
      ))}
    </>
  );
};