import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducer from './reducer';

export default (initialState) => {

  const sagaMiddleware = createSagaMiddleware();



  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  sagas.map(sagaMiddleware.run);

  return store;
}