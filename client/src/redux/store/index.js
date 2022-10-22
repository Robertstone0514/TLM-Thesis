/* eslint no-console: 0 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userData from '../reducers/reducers';
import stateData from '../initialState';

const logger = (store) => (next) => (action) => {
  console.groupCollapsed('dispatching', action.type);
  console.log('prev state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
  console.groupEnd();
};

const saver = (store) => (next) => (action) => {
  const result = next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState());
  return result;
};

const storeFactory = (initialState = stateData) => applyMiddleware(logger, saver)(createStore)(
  combineReducers({ userData }),
  (localStorage['redux-store'])
    ? JSON.parse(localStorage['redux-store'])
    : initialState,
);
export default storeFactory;
