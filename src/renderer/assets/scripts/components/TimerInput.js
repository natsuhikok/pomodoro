import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const Timer = ({ dispatch, timer }) => {
  // btn label for main button
  const btnLabel = () => {
    switch (timer.status) {
      case 'RUN':
        return 'pouse';
      case 'OVER':
        return 'finish';
      case 'STOP':
      case 'POUSE':
      default:
        return 'start';
    }
  };
  // main button that transform pouse/finish/start button
  const btnMain = (e) => {
    e.preventDefault();
    switch (timer.status) {
      case 'RUN':
        ipcRenderer.send('POUSE_TIMER');
        break;
      case 'OVER':
        ipcRenderer.send('RESET_TIMER');
        break;
      case 'STOP':
      case 'POUSE':
      default:
        ipcRenderer.send('START_TIMER');
        break;
    }
  };
  const btnSetTimer = (e, time) => {
    e.preventDefault(e);
    ipcRenderer.send('SET_TIMER', time);
  };
  const btnReset = (e) => {
    e.preventDefault();
    ipcRenderer.send('RESET_TIMER');
  };
  return (
    <div>
      <button onClick={e => btnMain(e)}>
        {btnLabel()}
      </button>
      <button onClick={e => btnReset(e)}>
        reset
      </button>
      <button onClick={e => btnSetTimer(e, 25 * 60)}>
        25min
      </button>
      <button onClick={e => btnSetTimer(e, 10 * 60)}>
        10min
      </button>
      <button onClick={e => btnSetTimer(e, 5)}>
        5s
      </button>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
