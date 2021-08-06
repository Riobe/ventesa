// BrowserWindow  to create native browser window.
const { BrowserWindow } = require('electron');
const path = require('path');

const isDev = require('electron-is-dev');
const { handleSettings } = require('./settings');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function registerHandlers(app) {
  // Magic string acquired via: https://www.electronjs.org/docs/api/app#appgetpathname
  const userDataPath = app.getPath('userData');
  handleSettings(userDataPath);
}

function createWindow(app) {
  // The handlers have to be registered before the app is loaded or the first invoke
  // against an event that has no handler will explode the app.
  registerHandlers(app);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // ...and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join('..', 'build', 'index.html'));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });
}

module.exports = createWindow;
