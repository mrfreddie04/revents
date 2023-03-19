import React, { Fragment, useState } from "react";
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar.jsx';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateFormOpen = () => {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  const handleFormClose = () => {
    setFormOpen(false);
  }  

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormOpen(true);
  }  

  return (
    <Fragment>
      <NavBar onFormOpen={handleCreateFormOpen}/>
      <Container className="main">
        <EventDashboard 
          formOpen={formOpen} 
          selectedEvent={selectedEvent}
          onFormClose={handleFormClose} 
          onSelectEvent={handleSelectEvent}
        />
      </Container>
    </Fragment>
  );
}

export default App;

