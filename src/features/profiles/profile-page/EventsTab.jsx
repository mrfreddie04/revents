import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Grid, Header, Card, Image } from 'semantic-ui-react';
import { getUserEvents } from "../../../app/firestore/firebase-db-service";
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';
import { profileActions } from '../profile-actions';
import { format } from 'date-fns';

const { listenToUserEvents } = profileActions;

const panes = [
  { menuItem: 'Future Events', pane: {key: 'future'}},
  { menuItem: 'Past Events', pane: {key: 'past'}},
  { menuItem: 'Hosting', pane: {key: 'hosting'}}
];

export default function EventsTab({profile}) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const { events } = useSelector(state => state.profile);
  const { loading } = useSelector(state => state.async);

  useFirestoreCollection({
    query: ()=>getUserEvents(profile.id, panes[activeTab].pane.key),
    data: (events) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id] 
  });

  const handleTabChange = (e,data) => {
    //console.log(panes[data.activeIndex].pane.key);
    setActiveTab(data.activeIndex);
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header 
            floated='left' 
            icon='calendar' 
            content='Events'
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={handleTabChange}
            panes={panes}           
            menu={{ secondary: true, pointing: true }} 
          />
          <Card.Group itemsPerRow={5} style={{marginTop:'10px'}}>
            { events.map( event => (
              <Card key={event.id} as={Link} to={`/events/${event.id}`}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} 
                  style={{minHeight:'100px', objectFit:'cover'}}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign='center'/>
                  <Card.Meta textAlign='center'>
                    <div>{format(event.date,'dd MMM yyyy')}</div>
                    <div>{format(event.date,'hh:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
              )
            )}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
} 