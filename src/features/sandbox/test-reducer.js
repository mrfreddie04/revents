const initialState = {
  data: 42
};

const ActionTypes = {
  INCREMENT_COUNTER: "INCREMENT_COUNTER",
  DECREMENT_COUNTER: "DECREMENT_COUNTER"
}

export const actions = {
  increment: (amount) => ({ type: ActionTypes.INCREMENT_COUNTER, payload: amount}),
  decrement: (amount) => ({ type: ActionTypes.DECREMENT_COUNTER, payload: amount}),
}

export default function testReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.INCREMENT_COUNTER:
      return {...state, data: state.data + action.payload};  
    case ActionTypes.DECREMENT_COUNTER:
      return {...state, data: state.data - action.payload};  
    default:
      return state; //Or throw an error
  }
}
