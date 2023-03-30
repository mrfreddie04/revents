const modalActionTypes = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL"
};

const { OPEN_MODAL, CLOSE_MODAL } = modalActionTypes;

const initialState = null;

export const modalActions = {
  openModal: (payload) => ({ type: OPEN_MODAL, payload: payload}),
  closeModal: () => ({ type: CLOSE_MODAL }),
}

export default function modalReducer(state = initialState, {type, payload}) {
  //const { modalType, modalProps } = payload;
  switch(type) {
    case OPEN_MODAL:
      return { ...payload };  
    case CLOSE_MODAL:
      return null;  
    default:
      return state; 
  }
}