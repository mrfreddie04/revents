/* global google */
import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment, Button } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import cuid from 'cuid';
import { categoryData } from '../../../app/api/categoryOptions';
import { eventActions } from '../event-actions';
import TextInput from '../../../app/common/form/text-input';
import TextArea from '../../../app/common/form/text-area';
import SelectInput from "../../../app/common/form/select-input";
import DateInput from "../../../app/common/form/date-input";
import PlaceInput from "../../../app/common/form/place-input";

const initialEventValues = {
  title:'',
  category:'',
  description:'',
  city: {address:'',latlng: null},
  venue: {address:'',latlng: null},
  date:''
};

export default function EventForm() {
  const { id } = useParams();
  const event = useSelector( store => store.event.events.find( event => event.id === id))
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = (values) => {
    console.log(values);
    event 
      ? dispatch(eventActions.updateEvent({...event,...values}))
      : dispatch(eventActions.createEvent({...values, id: cuid(), hostedBy: 'Bob', attendees: []}));
    history.push('/events');  
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

  //console.log("Values",values);

  return(    
    <Segment clearing>
      <Formik
        initialValues={values} 
        validationSchema={validationSchema}
        onSubmit={(values,actions)=>{
          handleFormSubmit(values);
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