import React from 'react';
import { connect } from 'react-redux';
const ListItem = ({ timestamp, count, id }) => (
  <li>
    <ul>
      <li>time: {timestamp}</li>
      <li>count: {count}</li>
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
