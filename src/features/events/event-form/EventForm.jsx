import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Header, Segment, Button } from 'semantic-ui-react';
import cuid from 'cuid';

const initialEventValues = {
  title:'',
  category:'',
  description:'',
  city:'',
  venue:'',
  date:''
};

export default function EventForm({selectedEvent, onFormClose, onEventCreate, onEventUpdate}) {
  const [values, setValues] = useState(selectedEvent || initialEventValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues(values => ({...values, [name]:value}));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    selectedEvent 
      ? onEventUpdate({...selectedEvent,...values})
      : onEventCreate({...values, id: cuid(), hostedBy: 'Bob', attendees: []});
    onFormClose();  
  }

  const header = selectedEvent ? 'Edit event' : 'Create new event';

  return(    
    <Segment clearing>
      <Header content={header}/>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input type="text" placeholder="Event title" 
            name="title"
            value={values.title} 
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category"
            name="category"
            value={values.category} 
            onChange={handleInputChange}          
          />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description"
            name="description"
            value={values.description} 
            onChange={handleInputChange}          
          />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="City"
            name="city"
            value={values.city} 
            onChange={handleInputChange}          
          />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Venue"
            name="venue"
            value={values.venue} 
            onChange={handleInputChange}          
          />
        </Form.Field>         
        <Form.Field>
          <input type="date" placeholder="Date"
            name="date"
            value={values.date} 
            onChange={handleInputChange}          
          />
        </Form.Field>          
        <Button type="submit" floated="right" positive content="Submit"/>
        <Button type="button" floated="right" content="Cancel" as={Link} to="/events" />
      </Form>
    </Segment>
  );
};