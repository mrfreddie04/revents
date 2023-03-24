import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';
import EventFilters from "./EventFilters";
//import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestores-service";
import { eventActions } from '../event-actions';

const { listenToEvents } = eventActions;

export default function EventDashboard() {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: listenToEventsFromFirestore,
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch] // listenToEvents, listenToEventsFromFirestore] 
  });

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