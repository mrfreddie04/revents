import React, { useState /*, useEffect*/ } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Form, Header, Segment, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { eventActions } from '../event-actions';

const initialEventValues = {
  title:'',
  category:'',
  description:'',
  city:'',
  venue:'',
  date:''
};

export default function EventForm() {
  const { id } = useParams();
  const event = useSelector( store => store.event.events.find( event => event.id === id))
  const [ values, setValues ] = useState(event || initialEventValues);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   setValues(event || initialEventValues);
  // }, [id])

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues(values => ({...values, [name]:value}));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    event 
      ? dispatch(eventActions.updateEvent({...event,...values}))
      : dispatch(eventActions.createEvent({...values, id: cuid(), hostedBy: 'Bob', attendees: []}));
    history.push('/events');  
  }

  const header = id ? 'Edit event' : 'Create new event';

  return(    
    <>    
    {!values && <div>Loading</div>}
    {values && (<Segment clearing>
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
    </Segment>)}
    </>
  );
};