import { combineReducers } from 'redux';

import testReducer from '../../features/sandbox/test-reducer';
import eventReducer from '../../features/events/event-reducer';
import modalReducer from '../common/modals/modal-reducer';
import authReducer from '../../features/auth/auth-reducer';
import profileReducer from '../../features/profiles/profile-reducer';
import asyncReducer from '../async/async-reducer';
import {connectRouter} from 'connected-react-router';

export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  test: testReducer,
  event: eventReducer,
  modal: modalReducer,
  auth: authReducer,
  profile: profileReducer,
  async: asyncReducer
});