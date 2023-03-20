import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { rootReducer } from './root-reducer';

export function configureStore() {
  return createStore(
    rootReducer, 
    devToolsEnhancer()
  );
}