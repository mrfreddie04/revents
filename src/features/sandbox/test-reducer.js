import { toast } from 'react-toastify';
import { asyncActions } from '../../app/async/async-reducer';
import { delay } from "../../app/common/util/util";

const initialState = {
  data: 42
};

const ActionTypes = {
  INCREMENT_COUNTER: "INCREMENT_COUNTER",
  DECREMENT_COUNTER: "DECREMENT_COUNTER"
}

export const actions = {
  increment: (amount) => {
    return async(dispatch) => {
      dispatch(asyncActions.asyncActionStart());
      try {
        await delay(1000);
        dispatch({ type: ActionTypes.INCREMENT_COUNTER, payload: amount});
        dispatch(asyncActions.asyncActionFinish());
      } catch(error) {
        dispatch(asyncActions.asyncActionError(error));
      }
    }    
  },
  decrement: (amount) => {
    return async(dispatch) => {
      dispatch(asyncActions.asyncActionStart());
      try {
        await delay(1000);
        //throw 'ooops!'
        dispatch({ type: ActionTypes.DECREMENT_COUNTER, payload: amount});
        dispatch(asyncActions.asyncActionFinish());
      } catch(error) {
        dispatch(asyncActions.asyncActionError(error));
        toast.error(error);
      }
    }        
  }
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


