import React from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import {Header, Menu} from 'semantic-ui-react';

export default function EventFilters({predicate, onSetPredicate,loading}) {
  const { authenticated } = useSelector(state => state.auth);

  return (
    <>
      { authenticated && (
        <Menu vertical size='large' style={{with:'100%'}}>
          <Header attached icon='filter' color='teal' content='Filters'/>  
          <Menu.Item 
            disabled={loading}
            content='All Events' 
            active={predicate.get('filter') === 'all'}
            onClick={() => onSetPredicate('filter','all')}
          />
          <Menu.Item 
            disabled={loading}
            content="I'm going" 
            active={predicate.get('filter') === 'isGoing'}
            onClick={() => onSetPredicate('filter','isGoing')}          
          />
          <Menu.Item 
            disabled={loading}
            content="I'm hosting" 
            active={predicate.get('filter') === 'isHosting'}
            onClick={() => onSetPredicate('filter','isHosting')}
          />
        </Menu>
      )}
      <Header icon='calendar' attached color='teal' content='Select date'/>
      <Calendar 
        value={predicate.get('startDate') || new Date()}
        onChange={(date) => onSetPredicate('startDate', date)}
        tileDisabled={()=>loading}
      />
    </>
  );
}    