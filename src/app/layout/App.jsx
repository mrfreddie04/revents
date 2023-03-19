import React, { Fragment, useState } from "react";
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar.jsx';

function App() {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  }

  const handleFormClose = () => {
    setFormOpen(false);
  }  

  return (
    <Fragment>
      <NavBar onFormOpen={handleFormOpen}/>
      <Container className="main">
        <EventDashboard formOpen={formOpen} onFormClose={handleFormClose}/>
      </Container>
    </Fragment>
  );
}

export default App;

