import { app, BrowserWindow } from 'electron';

let mainWindow = null;

if (process.env.NODE_ENV !== 'production') {
    console.log('this is not production');
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
