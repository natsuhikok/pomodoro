import { combineReducers } from 'redux';

const initialStates = {
  timer: {
    count: 0,
  },
};

const timer = (state = initialStates.timer, action) => {
  switch (action.type) {
    case 'UPDATE_COUNT':
      return {
        count: action.count,
      };
    default:
      return state;
  }
};

export default combineReducers({ timer });
