import { app, BrowserWindow, ipcMain } from 'electron';

require('date-utils');

let mainWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);

  // Open the DevTools if you want.
  mainWindow.webContents.openDevTools();

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
// IPC
// ******************************************
const timer = {
  status: 'STOP',
  countInterval: null,
  count: 0,
  end: 10,
};

// update status
const sendStatus = (e, STATUS) => {
  timer.status = STATUS;
  e.sender.send('UPDATE_STATUS', timer.status);
};

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

ipcMain.on('POUSE_TIMER', (e) => {
  sendStatus(e, 'POUSE');
  // stop interval
  clearInterval(timer.countInterval);
});

ipcMain.on('RESET_TIMER', (e) => {
  sendStatus(e, 'STOP');
  // reset count and interval
  clearInterval(timer.countInterval);
  const endCount = timer.count;
  timer.count = 0;
  e.sender.send('UPDATE_COUNT', timer.count);

  // add log
  const dt = new Date();
  e.sender.send('ADD_LOG', {
    id: `${dt.toFormat('YYYYMMDDHH24MISS')}${dt.getMilliseconds()}`,
    count: endCount,
    timestamp: {
      year: dt.toFormat('YYYY'),
      month: dt.toFormat('MM'),
      day: dt.toFormat('DD'),
      hour: dt.toFormat('HH24'),
      min: dt.toFormat('MI'),
    },
  });
});
