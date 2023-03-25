import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
import { authActions } from '../../features/auth/auth-actions';

const { verifyAuth } = authActions;

export function configureStore() {
  //return createStore(rootReducer, devToolsEnhancer());
  const store = createStore(
    rootReducer, 
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );

  store.dispatch(verifyAuth());

  return store;
}