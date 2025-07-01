const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
//require('update-electron-app')();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // Custom window controls (minimize/close)
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  win.webContents.openDevTools(); // This opens DevTools automatically



  // Handle window control events
  ipcMain.on('minimize', () => win.minimize());
  ipcMain.on('close', () => win.close());
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
