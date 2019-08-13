import { applyMiddleware, compose, createStore } from 'redux';
import createReducer from './reducers';
import thunk from 'redux-thunk';

const enhancer = compose(applyMiddleware(thunk));

const store: any = createStore(createReducer(), enhancer);

store.asyncReducers = {};

export const injectReducer = (key: any, reducer: any) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
