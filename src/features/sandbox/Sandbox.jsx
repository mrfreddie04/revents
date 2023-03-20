import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { actions } from "./test-reducer";

export default function Sandbox() {
  const data = useSelector(state => state.test.data);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(actions.increment(10));
  }

  const handleDecrement = () => {
    dispatch(actions.decrement(5));
  }  

  return(
    <>
      <h1>Testing 1,2,3</h1>
      <p>The data is: {data}</p>
      <div>
        <Button onClick={handleIncrement} color='green'>+</Button>
        <Button onClick={handleDecrement} color='blue'>-</Button>
      </div>
    </>
  );
}