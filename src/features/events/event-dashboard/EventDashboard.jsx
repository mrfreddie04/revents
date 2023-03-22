import React from "react";
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventFilters from "./EventFilters";
//import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";


export default function EventDashboard() {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);

  // if(loading) {
  //   return <LoadingComponent />;
  // }

  return(    
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder/>
            <EventListItemPlaceholder/>
          </>
        )} 
        {!loading && <EventList events={events}/>}
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters/>
      </Grid.Column>      
    </Grid>
  );
};