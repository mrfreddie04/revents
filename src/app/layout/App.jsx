import React, { Fragment } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
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
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/profile-page/ProfilePage";
import LoadingComponent from "./LoadingComponent.jsx";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  const location = useLocation();
  const { initialized } = useSelector(state => state.async);

  if(!initialized) {
    return <LoadingComponent content="Initializing app..."/>;
  }

  //console.log("App renders")

  return (
    <Fragment>
      <ModalManager/> 
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar/> 
      <Switch>      
        <Route exact path="/" component={HomePage}/>
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar/>
            <Container className='main'>
              <Route exact path="/error" component={ErrorComponent} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route exact path='/events' component={EventDashboard}/>     
              <Route path='/events/:id' component={EventDetailedPage}/>
              <PrivateRoute exact path="/account" component={AccountPage} />   
              <PrivateRoute path="/profile/:id" component={ProfilePage} />   
              <PrivateRoute 
                path={['/create-event','/manage/:id']}
                component={EventForm} 
                key={location.key} 
              />
            </Container>            
          </Fragment>
        )}>
        </Route>           
      </Switch>  
    </Fragment>
  );
}

