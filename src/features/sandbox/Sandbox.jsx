import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { actions } from "./test-reducer";
import { modalActions } from "../../app/common/modals/modal-reducer";
import TestLocationSearchInput from "./TestLocationSearchInput";
import TestMap from './TestMap';

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 11
};

export default function Sandbox() {
  const [map, setMap] = useState(true);
  const [location, setLocation] = useState(defaultProps);
  const data = useSelector(state => state.test.data);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(actions.increment(10));
  }

  const handleDecrement = () => {
    dispatch(actions.decrement(5));
  }  

  const handleOpenModal = () => {
    dispatch(modalActions.openModal({
      modalType: 'TestModal',
      modalProps: {data: "1,2,3..."}
    }));
  }

  const handleMap = () => {
    setMap( map => !map);
  }

  const handleCoords = (coords) => {
    const {lat, lng} = coords;
    setLocation(location => ({...location, center: {lat, lng}}));
  }

  return(
    <>
      <h1>Testing 1,2,3</h1>
      <p>The data is: {data}</p>
      <div>
        <Button onClick={handleOpenModal} color='teal'>Open Test Modal</Button>
        <Button onClick={handleMap} color='grey'>Map</Button>
        <Button onClick={handleIncrement} color='green'>Increment</Button>
        <Button onClick={handleDecrement} color='blue'>Decrement</Button>
      </div>
      <div style={{marginTop:'15px'}}>
        <TestLocationSearchInput onCoords={handleCoords}/>
        {map && <TestMap location={location}/>}
      </div>
    </>
  );
}