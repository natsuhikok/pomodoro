import React from 'react';
import { connect } from 'react-redux';
import countToTime from '../../../../util/countToTime';

const Timer = ({ timer }) => {
  return (
    <div className="Timer--count">
      {countToTime(timer.count)}
      <span className="Timer--count--end">
        {countToTime(timer.end)}
      </span>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
