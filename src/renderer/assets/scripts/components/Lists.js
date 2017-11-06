import React from 'react';
import { connect } from 'react-redux';
import countToTime from '../../../../util/countToTime';

const ListItem = ({ timestamp, count, id }) => (
  <li>
    <ul>
      <li>time: {`${timestamp.year}/${timestamp.month}/${timestamp.year}/${timestamp.day} ${timestamp.hour}:${timestamp.min}`}</li>
      <li>count: {countToTime(count)}</li>
    </ul>
  </li>
);

const Lists = ({ lists }) => {
  return (
    <ul>
      {lists.map(list => (
        <ListItem
          key={list.id}
          {...list}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({ lists: state.lists });
export default connect(mapStateToProps)(Lists);
