import { app, BrowserWindow, ipcMain } from 'electron';

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
};

const sendStatus = (e, STATUS) => {
  timer.status = STATUS;
  e.sender.send('UPDATE_STATUS', timer.status);
};

ipcMain.on('START_TIMER', (e) => {
  sendStatus(e, 'RUN');
  timer.countInterval = setInterval(() => {
    timer.count += 1;
    e.sender.send('UPDATE_COUNT', timer.count);
  }, 1000);
});

ipcMain.on('POUSE_TIMER', (e) => {
  sendStatus(e, 'POUSE');
  clearInterval(timer.countInterval);
});

ipcMain.on('RESET_TIMER', (e) => {
  sendStatus(e, 'STOP');
  clearInterval(timer.countInterval);
  timer.count = 0;
  e.sender.send('UPDATE_COUNT', timer.count);
});
