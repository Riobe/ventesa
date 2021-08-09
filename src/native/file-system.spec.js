jest.mock('fs', () => ({
  promises: {
    lstat: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

const fs = require('fs');

const fileSystem = require('./file-system');

describe('file-system', () => {
  let stringifySpy;
  let parseSpy;
  let statMock = {
    isFile: jest.fn(),
    isDirectory: jest.fn(),
  };

  beforeEach(() => {
    stringifySpy = jest.spyOn(JSON, 'stringify');
    parseSpy = jest.spyOn(JSON, 'parse');

    fs.promises.lstat.mockReset();
    fs.promises.lstat.mockResolvedValue(statMock);
    statMock.isFile.mockReturnValue(true);
    statMock.isDirectory.mockReturnValue(true);

    fs.promises.writeFile.mockClear();

    fs.promises.readFile.mockReset();
    fs.promises.readFile.mockResolvedValue({});
  });

  afterEach(() => {
    stringifySpy.mockRestore();
    parseSpy.mockRestore();
  });

  describe('fileExists', () => {
    it('should return true if fs.promises.lstat does not throw exception.', async () => {
      const path = 'test path';

      const exists = await fileSystem.fileExists(path);

      expect(exists).toBe(true);
      expect(fs.promises.lstat).toHaveBeenCalledTimes(1);
    });

    it('should call fs.promises.lstat with the given path.', async () => {
      const path = 'test path';

      const exists = await fileSystem.fileExists(path);

      expect(exists).toBe(true);
      expect(fs.promises.lstat).toHaveBeenCalledWith(path);
    });

    it('should return false if fs.promises.lstat throws an exception.', async () => {
      const path = 'test path';
      fs.promises.lstat.mockImplementation(() => {
        throw new Error('boom');
      });

      const exists = await fileSystem.fileExists(path);

      expect(exists).toBe(false);
      expect(fs.promises.lstat).toHaveBeenCalledTimes(1);
      expect(fs.promises.lstat).toHaveBeenCalledWith(path);
    });
  });

  describe('writeJson', () => {
    it('should try to write the stringified JSON given to it to the path given.', async () => {
      const path = 'test path';
      const data = { value: 'test data' };

      await fileSystem.writeJson(path, data);

      expect(stringifySpy).toHaveBeenCalledTimes(1);
      expect(stringifySpy).toHaveBeenCalledWith(data);

      const stringifiedData = stringifySpy.mock.results[0].value;

      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.promises.writeFile).toHaveBeenCalledWith(path, stringifiedData);
    });
  });

  describe('readJson', () => {
    it('should parse json from a given file path, and return the value.', async () => {
      const path = 'test path';
      const data = { value: 'test data' };
      const stringifiedData = JSON.stringify(data);
      fs.promises.readFile.mockResolvedValue(stringifiedData);

      const result = await fileSystem.readJson(path);

      expect(fs.promises.readFile).toHaveBeenCalledTimes(1);
      expect(fs.promises.readFile).toHaveBeenCalledWith(path);

      expect(parseSpy).toHaveBeenCalledTimes(1);
      expect(parseSpy).toHaveBeenCalledWith(stringifiedData);

      const parsedData = parseSpy.mock.results[0].value;
      expect(result).toBe(parsedData);
    });
  });
});
