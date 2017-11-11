import { combineReducers } from 'redux';

const initialStates = {
  timer: {
    count: 0,
    status: 'STOP',
    end: 25 * 60,
  },
  lists: [],
};

const timer = (state = initialStates.timer, action) => {
  switch (action.type) {
    case 'UPDATE_END':
      return {
        count: state.count,
        status: state.status,
        end: action.end,
      };
    case 'UPDATE_COUNT':
      return {
        count: action.count,
        status: state.status,
        end: state.end,
      };
    case 'UPDATE_STATUS':
      return {
        count: state.count,
        status: action.status,
        end: state.end,
      };
    default:
      return state;
  }
};

const list = (state = initialStates.lists, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return action.object;
    default:
      return state;
  }
};

export default combineReducers({ timer, list });
