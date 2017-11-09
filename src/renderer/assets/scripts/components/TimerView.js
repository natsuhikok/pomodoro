import React from 'react';
import { connect } from 'react-redux';
import countToTime from '../../../../util/countToTime';

const Timer = ({ timer }) => {
  return (
    <div>
      <div>
        <p>Status: {timer.status} / end: {countToTime(timer.end)}</p>
      </div>
      <div className="Timer--count">
        {countToTime(timer.count)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
