import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import HomePage from './../../features/home/HomePage';
//import Events from "../../features/events/Events";
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import EventDetailedPage from '../../features/events/event-detailed/EventDetailedPage';
import EventForm from "../../features/events/event-form/EventForm";
import NavBar from '../../features/nav/NavBar.jsx';

function App() {
  // const [formOpen, setFormOpen] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);

  // const handleCreateFormOpen = () => {
  //   setSelectedEvent(null);
  //   setFormOpen(true);
  // }

  // const handleFormClose = () => {
  //   setFormOpen(false);
  // }  

  // const handleSelectEvent = (event) => {
  //   setSelectedEvent(event);
  //   setFormOpen(true);
  // }  

  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      {/* <Route path="/events" component={Events}/> */}

      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar/>
          <Container className='main'>
            <Route exact path='/events' component={EventDashboard}/>        
            <Route path='/events/:id' component={EventDetailedPage}/>
            <Route path={['/create-event','/manage/:id']} component={EventForm}/>
          </Container>            
        </Fragment>
      )}>
      </Route>        
    </Switch>
  );
}

export default App;

