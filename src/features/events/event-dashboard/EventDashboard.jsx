import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import EventFilters from "./EventFilters";
import { eventActions } from '../event-actions';
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventsFeed from "./EventsFeed";

const { fetchEvents, setRetainState } = eventActions;

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  // const [predicate, setPredicate] = useState(new Map([
  //   ['startDate',new Date()],
  //   ['filter', 'all']
  // ]));
  const [initialLoading, setInitialLoading] = useState(false);
  const { events, moreEvents, lastVisible, filter, startDate, retainState } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const { authenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if(!retainState) {
      setInitialLoading(true);
      dispatch(fetchEvents(filter, startDate, limit, null)).then(() => {
        setInitialLoading(false);
      });
    }
    
    //when we leave this component we will set retainState flag
    return () => dispatch(setRetainState());
  }, [dispatch, filter, startDate, limit, retainState] ); //eslint-disable-line react-hooks/exhaustive-deps

  const handleFetchNextPage = () => {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible));
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
        <EventFilters 
          loading={initialLoading}
        />
      </Grid.Column>    
      <Grid.Column width={10}>
         <Loader active={loading}/> 
      </Grid.Column>  
    </Grid>
  );
};

