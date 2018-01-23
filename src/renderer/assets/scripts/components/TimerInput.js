import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const Timer = ({ dispatch, timer }) => {
  // btn label for main button
  const btnClass = () => {
    switch (timer.status) {
      case 'RUN':
        return 'btn-pouse';
      case 'OVER':
        return 'btn-finish';
      case 'STOP':
      case 'POUSE':
      default:
        return 'btn-start';
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
      <div className="Timer--btnMainWrapper">
        <button
          onClick={e => btnMain(e)}
          className={btnClass()}
        >
          <i />
        </button>
      </div>
      <div className="Timer--resetWrapper">
        <button className="btn-reset" onClick={e => btnReset(e)}>
          <i />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
