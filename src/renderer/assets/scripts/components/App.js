import React from 'react';
import TimerView from './TimerView';
import TimerInput from './TimerInput';
import List from './List';

const App = () => (
  <div>
    <div className="Timer">
      <TimerView />
      <TimerInput />
    </div>
    <List />
  </div>
);

export default App;
