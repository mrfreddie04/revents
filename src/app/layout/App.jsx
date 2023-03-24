import React, { Fragment } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import { ToastContainer } from 'react-toastify';
import HomePage from './../../features/home/HomePage';
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import EventDetailedPage from '../../features/events/event-detailed/EventDetailedPage';
import EventForm from "../../features/events/event-form/EventForm";
import NavBar from '../../features/nav/NavBar';
import Sandbox from "../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import ErrorComponent from "../common/errors/ErrorComponent";

export default function App() {
  const location = useLocation();

  return (
    <Fragment>
      <ModalManager/>-right 
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar/> 
      <Switch>      
        <Route exact path="/" component={HomePage}/>
        {/* <Route path="/events" component={Events}/> */}
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar/>
            <Container className='main'>
              <Route exact path="/error" component={ErrorComponent} />
              <Route exact path="/sandbox" component={Sandbox} />
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
    </Fragment>
  );
}

