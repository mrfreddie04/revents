import React, { Fragment, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import EventDetailedPage from '../../features/events/event-detailed/EventDetailedPage';
import EventForm from "../../features/events/event-form/EventForm";
import NavBar from '../../features/nav/NavBar.jsx';

export default function Events() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  let { path } = useRouteMatch();

  const handleFormClose = () => {
    setFormOpen(false);
  }  

  return (
    <Fragment>
      <NavBar/>
      <Container className="main">
        <Route exact path={`${path}/new`} component={EventForm}/>
        <Route path={`${path}/:id`} component={EventDetailedPage}/>
        <Route exact path={path}>
          <EventDashboard 
            formOpen={formOpen} 
            selectedEvent={selectedEvent}
            onFormClose={handleFormClose} 
          />            
        </Route>
      </Container>
    </Fragment>   
  );
}      
