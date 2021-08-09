jest.mock('electron', () => ({
  BrowserWindow: jest.fn(),
}));
jest.mock('electron-is-dev', () => true);
jest.mock('./settings');

const { BrowserWindow } = require('electron');
const { handleSettings } = require('./settings');

const { any, objectContaining } = expect;

const createWindow = require('./create-window');

describe('createWindow', () => {
  const paths = { userData: '~/.config/ventesa' };

  let app;
  let window;

  beforeEach(() => {
    BrowserWindow.mockReset();
    BrowserWindow.mockImplementation(() => {
      window = {
        loadURL: jest.fn(),
        loadFile: jest.fn(),
        on: jest.fn(),
        webContents: {
          openDevTools: jest.fn(),
        },
      };

      return window;
    });

    handleSettings.mockReset();

    app = {
      on: jest.fn(),
      getPath: jest.fn(),
    };

    app.getPath.mockImplementation(path => paths[path]);
  });

  it('should make a BrowserWindow.', async () => {
    createWindow(app);

    expect(BrowserWindow).toHaveBeenCalledTimes(1);
    expect(BrowserWindow).toHaveBeenCalledWith(
      objectContaining({
        width: any(Number),
        height: any(Number),
        webPreferences: objectContaining({
          preload: any(String),
        }),
      }),
    );
  });

  it('should make a secure BrowserWindow with recommended security settings.', async () => {
    createWindow(app);

    expect(BrowserWindow).toHaveBeenCalledTimes(1);
    expect(BrowserWindow).toHaveBeenCalledWith(
      objectContaining({
        webPreferences: objectContaining({
          nodeIntegration: false,
          contextIsolation: true,
          worldSafeExecuteJavaScript: true,
        }),
      }),
    );
  });

  it('should load from local host in dev mode.', async () => {
    createWindow(app);

    expect(window.loadURL).toHaveBeenCalledTimes(1);
    expect(window.loadURL).toHaveBeenCalledWith(any(String));
  });

  it('should open the dev tools in dev mode.', async () => {
    createWindow(app);

    expect(window.webContents.openDevTools).toHaveBeenCalledTimes(1);
  });

  it('should handle settings.', async () => {
    createWindow(app);

    expect(handleSettings).toHaveBeenCalledTimes(1);
    expect(handleSettings).toHaveBeenCalledWith(paths.userData);
  });

  it('should handle the closed event on the main window.', async () => {
    createWindow(app);

    expect(window.on).toHaveBeenCalledTimes(1);
    expect(window.on).toHaveBeenCalledWith('closed', any(Function));
  });

  it('should handle the activate event on the app.', async () => {
    createWindow(app);

    expect(app.on).toHaveBeenCalledTimes(1);
    expect(app.on).toHaveBeenCalledWith('activate', any(Function));
  });
});
