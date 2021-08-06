const { contextBridge, ipcRenderer } = require('electron');
const events = require('../shared/events');

contextBridge.exposeInMainWorld('ipc', {
  // Settings Events
  requestSettings: async () => {
    return await ipcRenderer.invoke(events.requestSettings);
  },
});
