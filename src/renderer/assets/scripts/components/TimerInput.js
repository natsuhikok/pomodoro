import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const Timer = ({ dispatch, timer }) => {
  // btn label for main button
  const btnLabel = () => {
    switch (timer.status) {
      case 'RUN':
        return 'POUSE';
      case 'OVER':
        return 'FINISH';
      case 'STOP':
      case 'POUSE':
      default:
        return 'START';
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
      <div className="Timer--btnMainWrapper">
        <button
          onClick={e => btnMain(e)}
          className="btn-main"
        >
          {btnLabel()}
        </button>
      </div>
      <div className="Timer--resetWrapper">
        <button className="btn-link" onClick={e => btnReset(e)}>
          reset
        </button>
      </div>
      <div className="Timer--btnTimeWrapper">
        <button className="btn-time" onClick={e => btnSetTimer(e, 25 * 60)}>
          25
        </button>
        <button className="btn-time" onClick={e => btnSetTimer(e, 10 * 60)}>
          10
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
