import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ipcRenderer } from 'electron';
import reducers from './reducers';
import App from './components/App';
import { updateCount, updateStatus, updateList, updateEnd } from './actions';

const appRoot = window.document.getElementById('App');
const store = createStore(reducers);

// initialize update list
ipcRenderer.send('INITIALZE_UPDATE_LIST');

// update Count
ipcRenderer.on('UPDATE_COUNT', (e, count) => {
  store.dispatch(updateCount(count));
});

// update status
ipcRenderer.on('UPDATE_STATUS', (e, status) => {
  if (status === 'OVER') {
    const notify = new window.Notification('pomodoro up');
    setTimeout(notify.close.bind(notify), 10000);
  }
  store.dispatch(updateStatus(status));
});

// update list
ipcRenderer.on('UPDATE_LIST', (e, obj) => {
  store.dispatch(updateList(obj));
});

// update end
ipcRenderer.on('UPDATE_END', (e, time) => {
  store.dispatch(updateEnd(time));
});


// render react dom
render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot,
);
