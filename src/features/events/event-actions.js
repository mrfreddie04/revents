import { eventActionTypes } from "./event-action-types";

export const eventActions = {
  createEvent: (event) => ({ type: eventActionTypes.CREATE_EVENT, payload: event}),
  updateEvent: (event) => ({ type: eventActionTypes.UPDATE_EVENT, payload: event}),
  deleteEvent: (event) => ({ type: eventActionTypes.DELETE_EVENT, payload: event})
}