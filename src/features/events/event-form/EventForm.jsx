/* global google */
import React, { useState } from "react";
import { Link, Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment, Button, Confirm } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { categoryData } from '../../../app/api/categoryOptions';
import { eventActions } from '../event-actions';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { 
  listenToEventFromFirestore, 
  updateEventInFirestore,
  addEventToFirestore,
  cancelEventToggle
} from "../../../app/firestore/firestore-service";
import TextInput from '../../../app/common/form/text-input';
import TextArea from '../../../app/common/form/text-area';
import SelectInput from "../../../app/common/form/select-input";
import DateInput from "../../../app/common/form/date-input";
import PlaceInput from "../../../app/common/form/place-input";
import LoadingComponent from '../../../app/layout/LoadingComponent';

const { listenToEvents } = eventActions;

const initialEventValues = {
  title:'',
  category:'',
  description:'',
  city: {address:'',latlng: null},
  venue: {address:'',latlng: null},
  date:''
};

export default function EventForm() {
  const [ loadingCancel, setLoadingCancel] = useState(false);
  const [ confirmOpen, setConfirmOpen] = useState(false);
  const { id } = useParams();
  const event = useSelector( store => store.event.events.find( event => event.id === id))
  const { loading, error } = useSelector(state => state.async);
  const dispatch = useDispatch();
  const history = useHistory();

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [dispatch, id],
    shouldExecute: !!id
  });  
    
  const handleFormSubmit = async (values, {setSubmitting}) => {
    //console.log(values);
    //setSubmitting(true);
    try {
      event 
        ? await updateEventInFirestore(values) //dispatch(updateEvent({...event,...values}))
        : await addEventToFirestore(values); //dispatch(createEvent({...values, id: cuid(), hostedBy: 'Bob', attendees: []}));
      setSubmitting(false);
      history.push('/events');  
    } catch(err) {
      toast.error(err.message);
      setSubmitting(false);
    }
  }

  const handleCancelConfirm = () => {
    setConfirmOpen(true);
  }

  const handleCancelCancel = () => {
    setConfirmOpen(false);
  }

  const handleCancelToggle = async (event) => {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch(error) {
      setLoadingCancel(false);
      toast.error(error.message);
    }
  }

  //const header = id ? 'Edit event' : 'Create new event';
  const values = event || initialEventValues;

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address:Yup.string().required('City is required')
    }),
    venue:  Yup.object().shape({
      address:Yup.string().required('Venue is required')
    }),
    date: Yup.string().required(),
  })

  if(error) return (<Redirect to="/error"/>);
  if(loading) return <LoadingComponent content='Loading event...' />;



  return(    
    <Segment clearing>
      <Formik
        initialValues={values} 
        validationSchema={validationSchema}
        onSubmit={(values, actions)=>{
          handleFormSubmit(values, actions);
        }}
      > 
        {({dirty, isSubmitting, isValid, values}) => (
        <Form className="ui form">
          <Header sub color='teal' content='Event Details'/>
          <TextInput placeholder="Event title" name="title"/>
          <SelectInput placeholder="Category" name="category" options={categoryData}/>
          <TextArea placeholder="Description" name="description" rows={3}/>
          <Header sub color='teal' content='Event Location'/>
          <PlaceInput placeholder="City" name="city"/>
          <PlaceInput 
            placeholder="Venue" 
            name="venue" 
            disabled={!values.city.latlng}
            options={{
              location: new google.maps.LatLng(values.city.latlng),
              radius: 1000,
              type: ['establishment']
            }}
          />
          <DateInput 
            placeholderText="Event Date" 
            name="date" 
            timeFormat='HH:mm'
            showTimeSelect
            timeCaption='time'
            dateFormat='MMMM d, yyyy h:mm a'
          /> 
          {event && (
            <>
              <Button 
                type="button" 
                loading={loadingCancel} 
                disabled={loadingCancel} 
                floated="left" 
                color={event.isCancelled ? 'green' : 'red'}
                content={event.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
                onClick={handleCancelConfirm}
              /> 
              <Confirm
                open={confirmOpen}
                onCancel={handleCancelCancel}
                onConfirm={()=>handleCancelToggle(event)}
                content={event.isCancelled 
                  ? 'This will Reactivate the Event - are you sure?' 
                  : 'This will Cancel the Event - are you sure?' }
              />              
            </>
          )}         
          <Button 
            type="submit" 
            loading={isSubmitting} 
            disabled={!isValid || !dirty || isSubmitting} 
            floated="right" 
            positive 
            content="Submit"
          />
          <Button 
            type="button" 
            disabled={isSubmitting} 
            floated="right" 
            content="Cancel" 
            as={Link} to="/events" 
          />
        </Form>         
        )}
      </Formik>
    </Segment>
  );
};

//{({dirty, isSubmitting, isValid}) => (
//   <Button 
//   type="submit" 
//   loading={isSubmitting} 
//   disabled={!isValid || !dirty || isSubmitting} 
//   floated="right" 
//   positive 
//   content="Submit"
// />
// <Button 
//   type="button" 
//   disabled={isSubmitting} 
//   floated="right" 
//   content="Cancel" 
//   as={Link} to="/events" 
// />