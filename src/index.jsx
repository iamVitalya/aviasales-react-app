import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducers/reducer';

import AviasalesApp from './components/AviasalesApp';

import 'normalize.css';
import './index.css';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
);

const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <AviasalesApp/>
  </Provider>,
  document.getElementById('root')
);
