import { combineReducers } from 'redux';

const initialStates = {
  timer: {
    count: 0,
    status: 'STOP',
  },
  lists: [],
};

const timer = (state = initialStates.timer, action) => {
  switch (action.type) {
    case 'UPDATE_COUNT':
      return {
        count: action.count,
        status: state.status,
      };
    case 'UPDATE_STATUS':
      return {
        count: state.count,
        status: action.status,
      };
    default:
      return state;
  }
};

const lists = (state = initialStates.lists, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [...state, action.object];
    default:
      return state;
  }
};

export default combineReducers({ timer, lists });
