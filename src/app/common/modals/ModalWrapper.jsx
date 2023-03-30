import React from "react";
import { useDispatch } from 'react-redux';
import { Modal } from "semantic-ui-react";
import { modalActions } from "./modal-reducer";

export default function ModalWrapper({children, size, header }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    //console.log("Modal close")
    dispatch(modalActions.closeModal());
  }

  return(
    <Modal
      open={true}
      size={size}
      onClose={handleClose}
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content image>
        {children}
      </Modal.Content>
      {/* <Modal.Actions>
        <Button color='black' onClick={handleClose}>
          Done!
        </Button>
      </Modal.Actions> */}
    </Modal>
  );
}