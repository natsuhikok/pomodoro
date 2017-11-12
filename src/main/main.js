import { app, BrowserWindow, ipcMain } from 'electron';
import DbManager from '../util/DbManager';

let mainWindow = null;

if (process.env.NODE_ENV !== 'production') {
    console.log('this is not production');
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 440,
    height: 700,
    resizable: false,
  });
  mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);

  // Open the DevTools if you want.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// After finished initialization.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // dock icon is clicked and there aren't open windows.
  if (mainWindow === null) {
    createWindow();
  }
});

// ******************************************
// IPCs
// ******************************************
const dbPath = './temp/db2';
const db = new DbManager(dbPath);

const timer = {
  status: 'STOP',
  countInterval: null,
  count: 0,
  end: 25 * 60,
};

// update status
const sendStatus = (e, STATUS) => {
  timer.status = STATUS;
  e.sender.send('UPDATE_STATUS', timer.status);
};

// ******************************************
// START TIMER
// ******************************************
ipcMain.on('START_TIMER', (e) => {
  sendStatus(e, 'RUN');
  // avoid malti interval and start interval
  clearInterval(timer.countInterval);
  timer.countInterval = setInterval(() => {
    // change status into OVER once after count reach
    if (
      timer.count >= timer.end
      && timer.status !== 'OVER'
    ) {
      sendStatus(e, 'OVER');
    }
    // update count
    timer.count += 1;
    e.sender.send('UPDATE_COUNT', timer.count);
  }, 1000);
});

// ******************************************
// SET TIMER
// ******************************************
ipcMain.on('SET_TIMER', (e, time) => {
  if (timer.status !== 'RUN' || timer.status !== 'OVER') {
    timer.end = time;
    e.sender.send('UPDATE_END', timer.end);
  }
});

// ******************************************
// POUSE TIMER
// ******************************************
ipcMain.on('POUSE_TIMER', (e) => {
  sendStatus(e, 'POUSE');
  // stop interval
  clearInterval(timer.countInterval);
});

// ******************************************
// UPDATE LIST
// ******************************************
ipcMain.once('INITIALZE_UPDATE_LIST', (e) => {
  db.on('LIST_ITEM_UPDATED', () => {
    db.getAll();
  });
  db.on('GOT_LIST', (data) => {
    e.sender.send('UPDATE_LIST', data);
  });
  // get all once while ready
  db.getAll();
});

// update list item
ipcMain.on('UPDATE_LIST_ITEM', (e, item) => {
  db.update(item);
});

// delete list item
ipcMain.on('DELETE_LIST_ITEM', (e, id) => {
  db.delete(id);
});

// ******************************************
// FINISH TIMER
// ******************************************
ipcMain.on('RESET_TIMER', (e) => {
  sendStatus(e, 'STOP');
  // reset count and interval
  clearInterval(timer.countInterval);
  const endCount = timer.count;
  timer.count = 0;
  e.sender.send('UPDATE_COUNT', timer.count);

  // update database
  db.createListItem(endCount);
});
