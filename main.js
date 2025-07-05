const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 2550,
    height: 3478,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('navigate', (event, page) => {
  mainWindow.loadFile(`renderer/${page}.html`);
});

ipcMain.on('window-control', (event, action) => {
  if (action === 'close') mainWindow.close();
  if (action === 'minimize') mainWindow.minimize();
});
