import React from 'react';
import { connect } from 'react-redux';
import countToTime from '../../../../util/countToTime';

const Timer = ({ timer }) => {
  return (
    <div>
      <div className="Timer--count">
        {countToTime(timer.count)}
      </div>
      <div className="Timer--cap">
        <span>min</span>
        <span>sec</span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
