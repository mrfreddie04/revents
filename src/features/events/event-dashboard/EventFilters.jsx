import React from 'react';
import Calendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import {Header, Menu} from 'semantic-ui-react';
import { eventActions } from '../event-actions';

const { setFilter, setStartDate } = eventActions;

export default function EventFilters({ loading }) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.auth);
  const { filter, startDate } = useSelector(state => state.event);

  const handleSetFilter = (value) => {
    dispatch(setFilter(value));
  }

  const handleSetStartDate = (value) => {
    dispatch(setStartDate(value));
  }  

  return (
    <>
      { authenticated && (
        <Menu vertical size='large' style={{with:'100%'}}>
          <Header attached icon='filter' color='teal' content='Filters'/>  
          <Menu.Item 
            disabled={loading}
            content='All Events' 
            active={filter === 'all'}
            onClick={() => handleSetFilter('all')}
          />
          <Menu.Item 
            disabled={loading}
            content="I'm going" 
            active={filter === 'isGoing'}
            onClick={() => handleSetFilter('isGoing')}          
          />
          <Menu.Item 
            disabled={loading}
            content="I'm hosting" 
            active={filter === 'isHosting'}
            onClick={() => handleSetFilter('isHosting')}
          />
        </Menu>
      )}
      <Header icon='calendar' attached color='teal' content='Select date'/>
      <Calendar 
        value={startDate || new Date()}
        onChange={handleSetStartDate}
        tileDisabled={() => loading}
      />
    </>
  );
}    