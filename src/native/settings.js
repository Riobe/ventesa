const { ipcMain } = require('electron');
const path = require('path');

const events = require('../shared/events');
const { fileExists, writeJsonSync, readJsonSync } = require('./file-system');

const SETTINGS_FILE_NAME = 'settings.json';

function getSettingsPath(app) {
  // Magic string acquired via: https://www.electronjs.org/docs/api/app#appgetpathname
  const userDataPath = app.getPath('userData');

  return path.join(userDataPath, SETTINGS_FILE_NAME);
}

/**
 * Ensures that the application has a settings.json file in it's user data directory
 * and creates it if it does not fine one.
 */
function ensureSettingsFile(app) {
  const settingsPath = getSettingsPath(app);

  // File already exists, nothing else to do.
  if (fileExists(settingsPath)) {
    return;
  }

  writeJsonSync(settingsPath, {
    debug: false,
  });
}

/**
 * Read the settings.json file and return the parsed JSON.
 */
function getSettings(app) {
  const settingsPath = getSettingsPath(app);

  return readJsonSync(settingsPath);
}

/**
 * Makes sure that there is a settings.json, then reads it in.
 * NOTE: This is a synchronous action and should be the only one.
 */
function handleSettings(app, window) {
  ensureSettingsFile(app);
  const settings = getSettings(app);

  ipcMain.on(events.settingsRequested, () => {
    window.webContents.send(events.settingsAcquired, settings);
  });
}

module.exports = {
  handleSettings,
};
