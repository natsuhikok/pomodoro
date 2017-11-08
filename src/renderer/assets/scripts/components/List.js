import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import countToTime from '../../../../util/countToTime';

const ListItem = ({ dispatch, timestamp, count, _id, comments }) => (
  <li>
    <ul className="ListItem">
      <li>time: {`${timestamp.year}/${timestamp.month}/${timestamp.year}/${timestamp.day} ${timestamp.hour}:${timestamp.min}`}</li>
      <li>count: {countToTime(count)}</li>
      <li>
        memo: <input
          type="text"
          value={comments.memo}
          onChange={(e) => {
            ipcRenderer.send('UPDATE_LIST_ITEM',
              {
                _id,
                docType: 'LIST',
                count,
                timestamp,
                comments: {
                  memo: e.target.value,
                  place: comments.place,
                },
              },
            );
          }}
        />
      </li>
      <li>
        place: <input
          type="text"
          value={comments.place}
          onChange={(e) => {
            ipcRenderer.send('UPDATE_LIST_ITEM',
              {
                _id: `${_id}`,
                docType: 'LIST',
                count,
                timestamp,
                comments: {
                  memo: comments.memo,
                  place: e.target.value,
                },
              },
            );
          }}
        />
      </li>
    </ul>
  </li>
);

const List = ({ dispatch, list }) => {
  return (
    <ul className="List">
      {list.map(item => (
        <ListItem
          key={item._id}
          {...item}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({ list: state.list });
export default connect(mapStateToProps)(List);
