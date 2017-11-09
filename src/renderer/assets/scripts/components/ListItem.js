import React from 'react';
import { ipcRenderer } from 'electron';
import countToTime from '../../../../util/countToTime';

const ListItem = ({ timestamp, count, _id, comments }) => {
  const deleteItem = (e, id) => {
    e.preventDefault();
    ipcRenderer.send('DELETE_LIST_ITEM', id);
  };
  const updateItem = (e, newComment) => {
    ipcRenderer.send('UPDATE_LIST_ITEM',
      {
        _id,
        docType: 'LIST',
        count,
        timestamp,
        comments: newComment,
      },
    );
  };
  return (
    <li>
      <ul className="ListItem">
        <li>time: {`${timestamp.year}/${timestamp.month}/${timestamp.year}/${timestamp.day} ${timestamp.hour}:${timestamp.min}`}</li>
        <li>count: {countToTime(count)}</li>
        <li>
          memo: <input
            type="text"
            value={comments.memo}
            onChange={(e) => {
              updateItem(e, {
                memo: e.target.value,
                place: comments.place,
              });
            }}
          />
        </li>
        <li>
          place: <input
            type="text"
            value={comments.place}
            onChange={(e) => {
              updateItem(e, {
                memo: comments.memo,
                place: e.target.value,
              });
            }}
          />
        </li>
        <button onClick={e => deleteItem(e, _id)}>
          delete
        </button>
      </ul>
    </li>
  );
};

export default ListItem;
