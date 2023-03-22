import React from 'react';
import Calendar from 'react-calendar';
import {Header, Menu} from 'semantic-ui-react';

export default function EventFilters() {
  return (
    <>
      <Menu vertical size='large' style={{with:'100%'}}>
        <Header attached icon='filter' color='teal' content='Filters'/>  
        <Menu.Item content='All Events'/>
        <Menu.Item content="I'm going"/>
        <Menu.Item content="I'm hosting"/>
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date'/>
      <Calendar/>
    </>
  );
}    