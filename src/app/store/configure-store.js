import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';

export function configureStore() {
  //return createStore(rootReducer, devToolsEnhancer());
  return createStore(
    rootReducer, 
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
}