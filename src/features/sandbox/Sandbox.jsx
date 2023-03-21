import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "semantic-ui-react";
import { actions } from "./test-reducer";
import { modalActions } from "../../app/common/modals/modal-reducer";

export default function Sandbox() {
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

  return(
    <>
      <h1>Testing 1,2,3</h1>
      <p>The data is: {data}</p>
      <div>
        <Button onClick={handleOpenModal} color='teal'>Open Test Modal</Button>
        <Button onClick={handleIncrement} color='green'>Increment</Button>
        <Button onClick={handleDecrement} color='blue'>Decrement</Button>
      </div>
    </>
  );
}