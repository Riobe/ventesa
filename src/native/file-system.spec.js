jest.mock('fs');

const fs = require('fs');

const fileSystem = require('./file-system');

describe('file-system', () => {
  let stringifySpy;
  let parseSpy;

  beforeEach(() => {
    stringifySpy = jest.spyOn(JSON, 'stringify');
    parseSpy = jest.spyOn(JSON, 'parse');

    fs.lstatSync.mockReset();
    fs.lstatSync.mockReturnValue({});

    fs.writeFileSync.mockClear();

    fs.readFileSync.mockReset();
    fs.readFileSync.mockReturnValue({});
  });

  afterEach(() => {
    stringifySpy.mockRestore();
    parseSpy.mockRestore();
  });

  describe('fileExists', () => {
    it('should return true if fs.lstatSync does not throw exception.', async () => {
      const path = 'test path';

      const exists = fileSystem.fileExists(path);

      expect(exists).toBe(true);
      expect(fs.lstatSync).toHaveBeenCalledTimes(1);
    });

    it('should call fs.lstatSync with the given path.', async () => {
      const path = 'test path';

      const exists = fileSystem.fileExists(path);

      expect(exists).toBe(true);
      expect(fs.lstatSync).toHaveBeenCalledWith(path);
    });

    it('should return false if fs.lstatSync throws an exception.', async () => {
      const path = 'test path';
      fs.lstatSync.mockImplementation(() => {
        throw new Error('boom');
      });

      const exists = fileSystem.fileExists(path);

      expect(exists).toBe(false);
      expect(fs.lstatSync).toHaveBeenCalledTimes(1);
      expect(fs.lstatSync).toHaveBeenCalledWith(path);
    });
  });

  describe('writeJsonSync', () => {
    it('should try to write the stringified JSON given to it to the path given.', async () => {
      const path = 'test path';
      const data = { value: 'test data' };

      fileSystem.writeJsonSync(path, data);

      expect(stringifySpy).toHaveBeenCalledTimes(1);
      expect(stringifySpy).toHaveBeenCalledWith(data);

      const stringifiedData = stringifySpy.mock.results[0].value;

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
      expect(fs.writeFileSync).toHaveBeenCalledWith(path, stringifiedData);
    });
  });

  describe('readJsonSync', () => {
    it('should parse json from a given file path, and return the value.', async () => {
      const path = 'test path';
      const data = { value: 'test data' };
      const stringifiedData = JSON.stringify(data);
      fs.readFileSync.mockReturnValue(stringifiedData);

      const result = fileSystem.readJsonSync(path);

      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.readFileSync).toHaveBeenCalledWith(path);

      expect(parseSpy).toHaveBeenCalledTimes(1);
      expect(parseSpy).toHaveBeenCalledWith(stringifiedData);

      const parsedData = parseSpy.mock.results[0].value;
      expect(result).toBe(parsedData);
    });
  });
});
