jest.mock('electron', () => ({
  ipcMain: {
    handle: jest.fn(),
  },
}));

jest.mock('./file-system');

const { ipcMain } = require('electron');
const channels = require('../shared/channels');
const { fileExists, writeJson, readJson } = require('./file-system');
const path = require('path');

const { any, objectContaining } = expect;

const settings = require('./settings');

describe('settings', () => {
  const testUserDataPath = '~/.config/ventesa';
  const expectedPath = path.join(testUserDataPath, 'settings.json');

  beforeEach(() => {
    ipcMain.handle.mockClear();

    fileExists.mockReset();
    fileExists.mockResolvedValue(true);

    writeJson.mockClear();

    readJson.mockReset();
    readJson.mockResolvedValue({});
  });

  describe('handleSettings', () => {
    it('should create the settings.json file if it does not exist.', async () => {
      fileExists.mockResolvedValue(false);

      settings.handleSettings(testUserDataPath);

      expect(fileExists).toHaveBeenCalledTimes(1);
      expect(fileExists).toHaveBeenCalledWith(expectedPath);

      const fileExistsResult = fileExists.mock.results[0].value;
      await fileExistsResult;

      expect(writeJson).toHaveBeenCalledTimes(1);
      expect(writeJson).toHaveBeenCalledWith(
        expectedPath,
        objectContaining({
          debug: false,
        }),
      );
    });

    it('should not create the settings.json file if it exists.', async () => {
      settings.handleSettings(testUserDataPath);

      expect(fileExists).toHaveBeenCalledTimes(1);
      expect(fileExists).toHaveBeenCalledWith(expectedPath);

      expect(writeJson).toHaveBeenCalledTimes(0);
    });

    it('should read the data from the settings.json file.', async () => {
      settings.handleSettings(testUserDataPath);

      const handler = ipcMain.handle.mock.calls[0][1];
      await handler();

      expect(readJson).toHaveBeenCalledTimes(1);
      expect(readJson).toHaveBeenCalledWith(expectedPath);
    });

    it('should return settings data in a settingsAcquired event when a settingsRequested event comes in.', async () => {
      settings.handleSettings(testUserDataPath);

      expect(ipcMain.handle).toHaveBeenCalledTimes(1);
      expect(ipcMain.handle).toHaveBeenCalledWith(
        channels.requestSettings,
        any(Function),
      );

      const handler = ipcMain.handle.mock.calls[0][1];

      expect(readJson).toHaveBeenCalledTimes(0);
      const result = await handler();
      expect(readJson).toHaveBeenCalledTimes(1);
      expect(readJson).toHaveBeenCalledWith(expectedPath);

      const settingsData = await readJson.mock.results[0].value;
      expect(settingsData).toBe(result);
    });
  });
});
