const { ipcMain } = require('electron');
const path = require('path');

const channels = require('../shared/channels');
const { fileExists, writeJson, readJson } = require('./file-system');

const SETTINGS_FILE_NAME = 'settings.json';

/**
 * Ensures that the application has a settings.json file in it's user data directory
 * and creates it if it does not fine one.
 */
async function ensureSettingsFile(settingsPath) {
  // File already exists, nothing else to do.
  if (await fileExists(settingsPath)) {
    return;
  }

  await writeJson(settingsPath, {
    debug: false,
  });
}

/**
 * Makes sure that there is a settings.json, then reads it in.
 */
function handleSettings(userDataPath) {
  const settingsPath = path.join(userDataPath, SETTINGS_FILE_NAME);
  const settingsFileEnsured = ensureSettingsFile(settingsPath);

  ipcMain.handle(channels.requestSettings, async () => {
    await settingsFileEnsured;

    return await readJson(settingsPath);
  });

  ipcMain.handle(channels.saveSettings, async (event, settings) => {
    return await writeJson(settingsPath, settings);
  });
}

module.exports = {
  handleSettings,
};
