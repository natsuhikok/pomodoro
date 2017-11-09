import React from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';

const List = ({ list }) => (
  <ul className="List">
    {list.map(item => (
      <ListItem
        key={item._id}
        {...item}
      />
    ))}
  </ul>
);

const mapStateToProps = state => ({ list: state.list });
export default connect(mapStateToProps)(List);
