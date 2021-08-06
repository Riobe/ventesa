const fs = require('fs');

async function directoryExists(path) {
  try {
    const stats = await fs.promises.lstat(path);

    return stats.isDirectory();
  } catch {
    // If this threw exception, then the file doesn't exist.
    return false;
  }
}

async function fileExists(path) {
  try {
    const stats = await fs.promises.lstat(path);

    return stats.isFile();
  } catch {
    // If this threw exception, then the file doesn't exist.
    return false;
  }
}

async function writeJson(path, json) {
  await fs.promises.writeFile(path, JSON.stringify(json));
}

async function readJson(path) {
  const fileData = await fs.promises.readFile(path);

  return JSON.parse(fileData);
}

module.exports = {
  directoryExists,
  fileExists,
  writeJson,
  readJson,
};
