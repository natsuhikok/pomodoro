import React from 'react';
import { connect } from 'react-redux';

const Timer = ({ dispatch, timer }) => {
  // convert counts into min:sec
  const countToTime = (count) => {
    const sec = count % 60;
    const min = Math.floor(count / 60);
    if (sec < 10 && min < 10) {
      return `0${min}:0${sec}`;
    } else if (sec < 10) {
      return `${min}:0${sec}`;
    } else if (min < 10) {
      return `0${min}:${sec}`;
    }
    return `${min}:${sec}`;
  };
  return (
    <div>
      <p>Status: {timer.status}</p>
      <p>Timer: {countToTime(timer.count)}</p>
    </div>
  );
};

const mapStateToProps = state => ({ timer: state.timer });
export default connect(mapStateToProps)(Timer);
