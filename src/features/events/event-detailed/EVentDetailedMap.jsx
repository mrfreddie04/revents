import React from "react";
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = ({lat, lng}) => {
  return (
    <Icon name='marker' size='big' color='red'/>
  )  
}

export default function EventDetailedMap({latlng}) {
  const zoom = 14;

  return (
    <Segment attached="bottom" style={{padding:0}}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_URL }}
          center={latlng}
          zoom={zoom}
        >
          <Marker
            lat={latlng.lat}
            lng={latlng.lng}
          />
        </GoogleMapReact>      
      </div>
    </Segment>
  )
}  