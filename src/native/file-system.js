const fs = require('fs');

function fileExists(path) {
  try {
    fs.lstatSync(path);

    return true;
  } catch {
    // If this threw exception, then the file doesn't exist.
    return false;
  }
}

function writeJsonSync(path, json) {
  fs.writeFileSync(path, JSON.stringify(json));
}

function readJsonSync(path) {
  const fileData = fs.readFileSync(path);

  return JSON.parse(fileData);
}

module.exports = {
  fileExists,
  writeJsonSync,
  readJsonSync,
};
