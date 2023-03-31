import { eventActionTypes } from "./event-action-types";
import { asyncActions } from '../../app/async/async-reducer';
//import { fetchSampleData } from "../../app/api/mockApi";
import { fetchEventsFromFirestore, dataFromSnapshot } from "../../app/firestore/firebase-db-service";

const {asyncActionStart, asyncActionFinish, asyncActionError} = asyncActions;
const {
  CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, FETCH_EVENT,
  LISTEN_TO_EVENT_CHAT, CLEAR_COMMENTS, CLEAR_EVENTS, LISTEN_TO_SELECTED_EVENT,
  SET_FILTER, SET_START_DATE, RETAIN_STATE, CLEAR_SELECTED_EVENT
} = eventActionTypes;

export const eventActions = {
  createEvent: (event) => ({ type: CREATE_EVENT, payload: event}),
  updateEvent: (event) => ({ type: UPDATE_EVENT, payload: event}),
  deleteEvent: (event) => ({ type: DELETE_EVENT, payload: event}),
  listenToSelectedEvent: (event) => ({ type: LISTEN_TO_SELECTED_EVENT, payload: event}),
  listenToEvents: (events) => ({ type: FETCH_EVENTS, payload: events}),
  listenToEvent: (event) => ({ type: FETCH_EVENT, payload: event}),
  listenToEventChat: (comments) => ({ type: LISTEN_TO_EVENT_CHAT, payload: comments}),
  clearComments: () => ({ type: CLEAR_COMMENTS}),
  clearEvents:() => ({ type: CLEAR_EVENTS}),  
  clearSelectedEvent: () => ({ type: CLEAR_SELECTED_EVENT }),
  setFilter: (filter) => {
    return (dispatch) => {
      dispatch(eventActions.clearEvents());
      dispatch({ type: SET_FILTER, payload: filter});
    }  
  },  
  setStartDate: (startDate) => {
    return (dispatch) => {
      dispatch(eventActions.clearEvents());
      dispatch({ type: SET_START_DATE, payload: startDate});
    }  
  },    
  setRetainState: () => ({ type: RETAIN_STATE }),
  fetchEvents: (filter, startDate, limit, lastDocSnapshot) => {
    return async (dispatch) => {
      dispatch(asyncActionStart());
      try {
        //const events = await fetchSampleData();
        const snapshot = await fetchEventsFromFirestore(filter, startDate, limit, lastDocSnapshot).get();
        const lastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length-1] : null;
        const moreEvents = snapshot.docs.length >= limit; //check if there could be more events to fetch
        const events = snapshot.docs.map(doc => dataFromSnapshot(doc));
        dispatch({ 
          type: FETCH_EVENTS, 
          payload: { events, lastVisible, moreEvents } 
        });
        dispatch(asyncActionFinish());
      } catch(error) {
        dispatch(asyncActionError(error));
      }      
    }
  },
}