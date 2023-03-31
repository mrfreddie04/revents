import { eventActionTypes } from "./event-action-types";
//import { sampleData } from "../../app/api/sampleData";
const { 
  CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, FETCH_EVENT, 
  LISTEN_TO_EVENT_CHAT, CLEAR_COMMENTS, CLEAR_EVENTS, LISTEN_TO_SELECTED_EVENT,
  SET_FILTER, SET_START_DATE, RETAIN_STATE, CLEAR_SELECTED_EVENT
} = eventActionTypes;

const initialState = {
  selectedEvent: null,
  events: [],
  comments: [],
  lastVisible: null,
  moreEvents: true,
  filter: 'all',
  startDate: new Date(),
  retainState: false
};

export default function eventReducer(state = initialState, {type, payload}) {
  const { events } = state;
  switch(type) {
    case FETCH_EVENTS:
      return { ...state, 
                events: [...events, ...payload.events], 
                moreEvents: payload.moreEvents, 
                lastVisible: payload.lastVisible };   
    case LISTEN_TO_SELECTED_EVENT:
      return { ...state, selectedEvent: payload};  
    case FETCH_EVENT:
      return { ...state, events: [...events, payload]};           
    case CREATE_EVENT:
      return { ...state, events: [...events, payload]};  
    case UPDATE_EVENT:
      return { ...state, events: events.map( event => event.id !== payload.id ? event : payload) };  
    case DELETE_EVENT:
      return { ...state, events: events.filter(event => event.id !== payload.id)}
    case LISTEN_TO_EVENT_CHAT:  
      return { ...state, comments: [...payload]}; 
    case CLEAR_COMMENTS:  
      return { ...state, comments: []}; 
    case CLEAR_SELECTED_EVENT:  
      return { ...state, selectedEvent: null }; 
    case SET_FILTER:  
      return { ...state, filter: payload, retainState: false}; 
    case SET_START_DATE:  
      return { ...state, startDate: payload, retainState: false}; 
    case RETAIN_STATE:  
      return { ...state, retainState: true}; 
    case CLEAR_EVENTS:  
      return { ...state, 
               events: [], 
               moreEvents: true, 
               lastVisible: null,
               retainState: false };
    default:
      return state; //Or throw an error
  }
}