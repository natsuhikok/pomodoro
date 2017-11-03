import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './App';

const appRoot = window.document.getElementById('App');
const store = createStore(reducers);

// render react dom
render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot,
);
