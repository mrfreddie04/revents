import React, { Fragment } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import HomePage from './../../features/home/HomePage';
//import Events from "../../features/events/Events";
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import EventDetailedPage from '../../features/events/event-detailed/EventDetailedPage';
import EventForm from "../../features/events/event-form/EventForm";
import NavBar from '../../features/nav/NavBar';
import Sandbox from "../../features/sandbox/Sandbox";

function App() {
  const location = useLocation();

  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      {/* <Route path="/events" component={Events}/> */}
      <Route exact path="/sandbox" component={Sandbox} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar/>
          <Container className='main'>
            <Route exact path='/events' component={EventDashboard}/>        
            <Route path='/events/:id' component={EventDetailedPage}/>
            <Route path={['/create-event','/manage/:id']}>
              <EventForm key={location.key}/>
            </Route>
          </Container>            
        </Fragment>
      )}>
      </Route>        
    </Switch>
  );
}

export default App;

