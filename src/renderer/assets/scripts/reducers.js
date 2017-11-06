import { combineReducers } from 'redux';

const initialStates = {
  timer: {
    count: 0,
    status: 'STOP',
    end: 10,
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

const lists = (state = initialStates.lists, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [...state, action.object];
    case 'UPDATE_MEMO':
      return state.map((s) => {
        const ns = s;
        if (s.id === action.id) {
          ns.comments.memo = action.memo;
        }
        return ns;
      });
    case 'UPDATE_PLACE':
      return state.map((s) => {
        const ns = s;
        if (s.id === action.id) {
          ns.comments.place = action.place;
        }
        return ns;
      });
    default:
      return state;
  }
};

export default combineReducers({ timer, lists });
