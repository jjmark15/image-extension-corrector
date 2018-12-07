#! node
const path = require('path');
const fsp = require('fs').promises;
const correctImageType = require('./image_correct');

async function performBatchCorrection(dirPath) {
  return fsp.readdir(dirPath).then((files) => {
    return Promise.all(files.map((file) => {
      return correctImageType(path.resolve(path.join(dirPath, file)));
    }));
  });
}

async function parseArgs() {
  await Promise.all(process.argv.slice(2).map((val) => {
    return fsp.stat(val).then((stats) => {
      if (stats.isFile()) {
        return correctImageType(val);
      }
      if (stats.isDirectory()) {
        return performBatchCorrection(val);
      }
      return Promise.resolve();
    });
  }));
}

parseArgs();
