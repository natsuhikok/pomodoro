import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const Timer = ({ dispatch, timer }) => {
  const btnStart = (e) => {
    e.preventDefault();
    ipcRenderer.send('START_TIMER');
  };
  const btnReset = (e) => {
    e.preventDefault();
    ipcRenderer.send('RESET_TIMER');
  };
  return (
    <div>
      <button onClick={e => btnStart(e)}>
        start
      </button>
      <button onClick={e => btnReset(e)}>
        reset
      </button>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
