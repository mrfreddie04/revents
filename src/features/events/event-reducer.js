import { eventActionTypes } from "./event-action-types";
//import { sampleData } from "../../app/api/sampleData";
const { 
  CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS, FETCH_EVENT, 
  LISTEN_TO_EVENT_CHAT, CLEAR_COMMENTS
} = eventActionTypes;

const initialState = {
  events: [],
  comments: []
};

export default function eventReducer(state = initialState, {type, payload}) {
  const { events } = state;
  switch(type) {
    case FETCH_EVENTS:
      return { ...state, events: [...payload]};     
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
    default:
      return state; //Or throw an error
  }
}