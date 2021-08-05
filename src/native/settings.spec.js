jest.mock('electron', () => ({
  ipcMain: {
    on: jest.fn(),
  },
}));

jest.mock('./file-system');

const { ipcMain } = require('electron');
const events = require('../shared/events');
const { fileExists, writeJsonSync, readJsonSync } = require('./file-system');
const path = require('path');

const { any, objectContaining } = expect;

const settings = require('./settings');

describe('settings', () => {
  let app;
  let window;

  beforeEach(() => {
    ipcMain.on.mockClear();

    fileExists.mockReset();
    fileExists.mockReturnValue(true);

    writeJsonSync.mockClear();

    readJsonSync.mockReset();
    readJsonSync.mockReturnValue({});

    app = {
      getPath: jest.fn(),
    };

    window = {
      webContents: {
        send: jest.fn(),
      },
    };
  });

  describe('handleSettings', () => {
    const testPath = 'testPath/';
    const expectedPath = path.join(testPath, 'settings.json');

    beforeEach(() => {
      app.getPath.mockReturnValue(testPath);
    });

    it('should look for the settings.json file in the userData directory.', async () => {
      settings.handleSettings(app, window);

      expect(app.getPath).toHaveBeenCalledWith('userData');
    });

    it('should create the settings.json file if it does not exist.', async () => {
      fileExists.mockReturnValue(false);

      settings.handleSettings(app, window);

      expect(fileExists).toHaveBeenCalledTimes(1);
      expect(fileExists).toHaveBeenCalledWith(expectedPath);

      expect(writeJsonSync).toHaveBeenCalledTimes(1);
      expect(writeJsonSync).toHaveBeenCalledWith(
        expectedPath,
        objectContaining({
          debug: false,
        }),
      );
    });

    it('should not create the settings.json file if it exists.', async () => {
      settings.handleSettings(app, window);

      expect(fileExists).toHaveBeenCalledTimes(1);
      expect(fileExists).toHaveBeenCalledWith(expectedPath);

      expect(writeJsonSync).toHaveBeenCalledTimes(0);
    });

    it('should read the data from the settings.json file.', async () => {
      settings.handleSettings(app, window);

      expect(readJsonSync).toHaveBeenCalledTimes(1);
      expect(readJsonSync).toHaveBeenCalledWith(expectedPath);
    });

    it('should return settings data in a settingsAcquired event when a settingsRequested event comes in.', async () => {
      settings.handleSettings(app, window);

      expect(ipcMain.on).toHaveBeenCalledTimes(1);
      expect(ipcMain.on).toHaveBeenCalledWith(
        events.settingsRequested,
        any(Function),
      );

      const handler = ipcMain.on.mock.calls[0][1];
      const settingsData = readJsonSync.mock.results[0].value;
      expect(window.webContents.send).toHaveBeenCalledTimes(0);

      handler();

      expect(window.webContents.send).toHaveBeenCalledTimes(1);
      expect(window.webContents.send).toHaveBeenCalledWith(
        events.settingsAcquired,
        settingsData,
      );
    });
  });
});
