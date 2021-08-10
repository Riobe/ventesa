const { contextBridge, ipcRenderer } = require('electron');
const channels = require('../shared/channels');

contextBridge.exposeInMainWorld('ipc', {
  // Settings channels
  requestSettings: async () => {
    return await ipcRenderer.invoke(channels.requestSettings);
  },
  saveSettings: async settingsData => {
    return await ipcRenderer.invoke(channels.saveSettings, settingsData);
  },
});
