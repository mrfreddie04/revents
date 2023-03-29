import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';
import EventFilters from "./EventFilters";
//import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToEventsFromFirestore } from "../../../app/firestore/firebase-db-service";
import { eventActions } from '../event-actions';
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventsFeed from "./EventsFeed";

const { listenToEvents } = eventActions;

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const { authenticated } = useSelector(state => state.auth);
  const [predicate, setPredicate] = useState(new Map([
    ['startDate',new Date()],
    ['filter', 'all']
  ]));

  //console.log(predicte)

  const handleSetPredicate = (key, value) => {
    //setPredicate(predicate=>predicate.set(key,value));
    setPredicate(new Map(predicate.set(key,value)));
  }

  useFirestoreCollection({
    query: ()=>listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate] // listenToEvents, listenToEventsFromFirestore] 
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
        { authenticated && <EventsFeed/>}
        <EventFilters predicate={predicate} onSetPredicate={handleSetPredicate} loading={loading}/>
      </Grid.Column>      
    </Grid>
  );
};