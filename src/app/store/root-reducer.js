import { combineReducers } from 'redux';

import testReducer from '../../features/sandbox/test-reducer';
import eventReducer from '../../features/events/event-reducer';

export const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer
});