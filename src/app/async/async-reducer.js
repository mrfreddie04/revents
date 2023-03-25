const asyncActionTypes = {
  ASYNC_ACTION_START: "ASYNC_ACTION_START",
  ASYNC_ACTION_FINISH: "ASYNC_ACTION_FINISH",
  ASYNC_ACTION_ERROR: "ASYNC_ACTION_ERROR",
  APP_LOADED: 'APP_LOADED'
};

const { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR, APP_LOADED } = asyncActionTypes;

const initialState = {
  loading: false,
  error: null,
  initialized: false
};

export const asyncActions = {
  asyncActionStart: () => ({type:ASYNC_ACTION_START}),
  asyncActionFinish: () => ({type:ASYNC_ACTION_FINISH}),
  asyncActionError: (error) => ({type:ASYNC_ACTION_ERROR, payload: error}),
  asyncActionInitialized: () => ({type:APP_LOADED}),
  // asyncActionStart: () => {
  //   return async(dispatch) => {
  //     dispatch({type:ASYNC_ACTION_START});
  //     await delay(1000);
  //     dispatch({type:ASYNC_ACTION_FINISH});
  //   }
  // },
}

export default function asyncReducer(state = initialState, {type, payload}) {
  //console.log(type,payload);
  switch(type) {
    case ASYNC_ACTION_START:
      return { ...state, loading: true, error: null };  
    case ASYNC_ACTION_FINISH:
      return { ...state, loading: false, error: null };  
    case ASYNC_ACTION_ERROR:
      return { ...state, loading: false, error: payload /*|| new Error("Something went wrong")*/ };  
    case APP_LOADED:
      return { ...state, initialized: true };  
    default:
      return state; 
  }
}