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
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
