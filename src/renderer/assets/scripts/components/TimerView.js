import React from 'react';
import { connect } from 'react-redux';

const Timer = ({ dispatch, timer }) => {
  return (
    <div>
      <p>Timer: {timer.count}</p>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
