import { combineReducers } from 'redux';

import testReducer from '../../features/sandbox/test-reducer';
import eventReducer from '../../features/events/event-reducer';
import modalReducer from '../common/modals/modal-reducer';
import authReducer from '../../features/auth/auth-reducer';
import asyncReducer from '../async/async-reducer';

export const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modal: modalReducer,
  auth: authReducer,
  async: asyncReducer
});