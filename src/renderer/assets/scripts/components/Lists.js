import React from 'react';
import { connect } from 'react-redux';
import { updateMemo, updatePlace } from '../actions';
import countToTime from '../../../../util/countToTime';

const ListItem = ({ dispatch, timestamp, count, id, comments }) => (
  <li>
    <ul>
      <li>time: {`${timestamp.year}/${timestamp.month}/${timestamp.year}/${timestamp.day} ${timestamp.hour}:${timestamp.min}`}</li>
      <li>count: {countToTime(count)}</li>
      <li>
        memo: <input
          type="text"
          value={comments.memo}
          onChange={(e) => {
            dispatch(updateMemo(e.target.value, id));
          }}
        />
      </li>
      <li>
        place: <input
          type="text"
          value={comments.place}
          onChange={(e) => {
            dispatch(updatePlace(e.target.value, id));
          }}
        />
      </li>
    </ul>
  </li>
);

const Lists = ({ dispatch, lists }) => {
  return (
    <ul>
      {lists.map(list => (
        <ListItem
          key={list.id}
          {...list}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({ lists: state.lists });
export default connect(mapStateToProps)(Lists);
