import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ipcRenderer } from 'electron';
import reducers from './reducers';
import App from './components/App';
import { updateCount, updateStatus } from './actions';

const appRoot = window.document.getElementById('App');
const store = createStore(reducers);

// update Count
ipcRenderer.on('UPDATE_COUNT', (e, count) => {
  store.dispatch(updateCount(count));
});

// update status
ipcRenderer.on('UPDATE_STATUS', (e, status) => {
  store.dispatch(updateStatus(status));
});

// render react dom
render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot,
);
