#! node
const correctImageType = require('./image_correct');
const path = require('path')
const fs = require('fs')

function performBatchCorrection(dirPath) {
  let count = 0;
  fs.readdir(dirPath, (err, files) => {
    files.forEach(file => {
      correctImageType(path.resolve(path.join(dirPath, file)));
      count += 1
    });
  })
  return count;
}

function parseArgs() {
  let count = 0;
  process.argv.slice(2).forEach(function (val, index, array) {
    fs.stat(val, (err, stats) => {
      if (stats.isFile()) {
        count += correctImageType(val);
      } else if (stats.isDirectory()) {
        count += performBatchCorrection(val);
      }
    })
  });
  return count;
}

parseArgs();