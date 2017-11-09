import { EventEmitter } from 'events';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

const pouchCollate = require('pouchdb-collate');
require('date-utils');

PouchDB.plugin(PouchDBFind);

export default class DbManager extends EventEmitter {
  constructor(path) {
    super();
    this.path = path;
    this.pouchDB = new PouchDB(path);
    // get indexable string for id
    this.getId = (a => pouchCollate.toIndexableString(a));
  }

  // ******************************************
  // CREATE LIST ITEM
  // obj: {
  //   docType,
  //   count,
  //   timestamp: { all, year, month, day, hour, min }
  //   id,
  //   comments: (blank)
  // }
  // ******************************************
  createListItem(count) {
    const dt = new Date();
    const item = {
      docType: 'LIST',
      count,
      comments: {
        memo: '',
        place: '',
      },
      timestamp: {
        all: `${dt.toFormat('YYYYMMDDHH24MISS')}${dt.getMilliseconds()}`,
        year: dt.toFormat('YYYY'),
        month: dt.toFormat('MM'),
        day: dt.toFormat('DD'),
        hour: dt.toFormat('HH24'),
        min: dt.toFormat('MI'),
      },
    };
    item._id = this.getId([
      item.docType,
      item.timestamp.all,
    ]);
    this.pouchDB.put(item).then(() => {
      this.emit('LIST_ITEM_UPDATED');
    }).catch((err) => {
      this.emit('error', err);
    });
  }
  // ******************************************
  // GET ALL
  // ******************************************
  getAll() {
    this.pouchDB.find({
      selector: { docType: 'LIST' },
    }).then((data) => {
      const reversed = data.docs.slice().reverse();
      this.emit('GOT_LIST', reversed);
    });
  }
  // ******************************************
  // UPDATE
  // ******************************************
  update(item) {
    this.pouchDB.get(item._id).then((data) => {
      const updateItem = item;
      updateItem._rev = data._rev;
      return this.pouchDB.put(updateItem);
    }).then(() => {
      this.emit('LIST_ITEM_UPDATED');
    }).catch((err) => {
      this.emit('error', err);
    });
  }
  // ******************************************
  // DELETE
  // ******************************************
  delete(id) {
    this.pouchDB.get(id).then((data) => {
      return this.pouchDB.remove(data);
    }).then(() => {
      this.emit('LIST_ITEM_UPDATED');
    }).catch((err) => {
      this.emit('error', err);
    });
  }
}
