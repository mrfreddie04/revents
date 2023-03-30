import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import EventListItem from "./EventListItem";
//import { Grid } from 'semantic-ui-react';

export default function EventList({events, onGetNextPage, loading, moreEvents}) {

  if(events.length === 0) {
    return null;
  }

  return(    
    <InfiniteScroll
      pageStart={0}
      loadMore={onGetNextPage}
      hasMore={!loading && moreEvents}
      initialLoad={false}
    >
      {events.map(event => (
        <EventListItem key={event.id} event={event}/>
      ))}
    </InfiniteScroll>
  );
};