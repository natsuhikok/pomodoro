import React from 'react';
import { connect } from 'react-redux';
import countToTime from '../../../../util/countToTime';

const Timer = ({ dispatch, timer }) => {
  return (
    <div>
      <p>Status: {timer.status} / end: {countToTime(timer.end)}</p>
      <p>Timer: {countToTime(timer.count)}</p>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
