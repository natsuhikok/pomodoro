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

export default countToTime;
