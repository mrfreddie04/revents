import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from "semantic-ui-react";
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from "../../../app/firestore/firebase-db-service";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import LoadingComponent from '../../../app/layout/LoadingComponent';

import { eventActions } from '../event-actions';

const { listenToEvents } = eventActions;

export default function EventDetailedPage() {
  const { id } = useParams();
  const event = useSelector( store => {
    return store.event.events.find( event => event.id === id);}
  );
  const { loading, error } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [dispatch, id]
  });  

  //display loading indicator if data is being loaded or event is null
  if (loading || (!event && !error)) return <LoadingComponent content='Loading event...' />;

  if(error) {
    return (<Redirect to="/error"/>);
  }

  return (
    <Grid>
      <Grid.Column width={10}>       
        <EventDetailedHeader event={event}/>
        <EventDetailedInfo event={event}/>
        <EventDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees}/>
      </Grid.Column>
    </Grid>
  )
}