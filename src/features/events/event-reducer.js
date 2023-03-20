import { eventActionTypes } from "./event-action-types";
import { sampleData } from "../../app/api/sampleData";
const { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } = eventActionTypes;

const initialState = {
  events: sampleData
};

export default function eventReducer(state = initialState, {type, payload}) {
  const { events } = state;
  switch(type) {
    case CREATE_EVENT:
      return { ...state, events: [...events, payload]};  
    case UPDATE_EVENT:
      return { ...state, events: events.map( event => event.id !== payload.id ? event : payload) };  
    case DELETE_EVENT:
      return { ...state, events: events.filter(event => event.id !== payload.id)}
    default:
      return state; //Or throw an error
  }
}