import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const Timer = ({ dispatch, timer }) => {
  const handleClickStart = (e) => {
    e.preventDefault();
    ipcRenderer.send('START_TIMER');
  };
  return (
    <div>
      <button onClick={e => handleClickStart(e)}>
        start
      </button>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
