import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import EventFilters from "./EventFilters";
import { eventActions } from '../event-actions';
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventsFeed from "./EventsFeed";

const { fetchEvents, clearEvents } = eventActions;

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const [predicate, setPredicate] = useState(new Map([
    ['startDate',new Date()],
    ['filter', 'all']
  ]));
  const [initialLoading, setInitialLoading] = useState(false);
  const { events, moreEvents, lastVisible } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const { authenticated } = useSelector(state => state.auth);

  useEffect(() => {
    setInitialLoading(true);
    dispatch(clearEvents());
    dispatch(fetchEvents(predicate, limit, null)).then(() => {
      setInitialLoading(false);
    });
    
    //not needed - it is enough to clear events up front
    //return () => dispatch(clearEvents());
  }, [dispatch, predicate, limit] ); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSetPredicate = (key, value) => {
    setPredicate(new Map(predicate.set(key,value)));
  }

  const handleFetchNextPage = () => {
    dispatch(fetchEvents(predicate, limit, lastVisible));
  }

  return(    
    <Grid>
      <Grid.Column width={10}>
        {initialLoading && (
          <>
            <EventListItemPlaceholder/>
            <EventListItemPlaceholder/>
          </>
        )} 
        {!initialLoading && (
          <EventList 
            events={events} 
            onGetNextPage={handleFetchNextPage} 
            loading={loading}
            moreEvents={moreEvents}
          />
        )}

      </Grid.Column>
      <Grid.Column width={6}>
        { authenticated && <EventsFeed/>}
        <EventFilters predicate={predicate} onSetPredicate={handleSetPredicate} loading={initialLoading}/>
      </Grid.Column>    
      <Grid.Column width={10}>
         <Loader active={loading}/> 
      </Grid.Column>  
    </Grid>
  );
};

