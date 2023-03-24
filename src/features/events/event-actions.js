import { eventActionTypes } from "./event-action-types";
import { asyncActions } from '../../app/async/async-reducer';
import { fetchSampleData } from "../../app/api/mockApi";

const {asyncActionStart, asyncActionFinish, asyncActionError} = asyncActions;
const {CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, FETCH_EVENT} = eventActionTypes;

export const eventActions = {
  createEvent: (event) => ({ type: CREATE_EVENT, payload: event}),
  updateEvent: (event) => ({ type: UPDATE_EVENT, payload: event}),
  deleteEvent: (event) => ({ type: DELETE_EVENT, payload: event}),
  fetchEvents: () => {
    return async (dispatch) => {
      dispatch(asyncActionStart());
      try {
        const events = await fetchSampleData();
        dispatch({ type: FETCH_EVENTS, payload: events});
        dispatch(asyncActionFinish());
      } catch(error) {
        dispatch(asyncActionError(error));
      }      
    }
  },
  listenToEvents: (events) => ({ type: FETCH_EVENTS, payload: events}),
  listenToEvent: (event) => ({ type: FETCH_EVENT, payload: event}),
}