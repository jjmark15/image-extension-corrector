const readChunk = require('read-chunk');
const imageType = require('image-type');
const path = require('path');
const fsp = require('fs').promises;

function getCorrectType(fp) {
  const buffer = readChunk.sync(fp, 0, 12);

  if (imageType(buffer) === null) {
    return null;
  }
  return imageType(buffer).ext;
}

function getCurrentType(fp) {
  return fp.substr((fp.lastIndexOf('.') + 1));
}

function imageCorrect(fp) {
  return getCurrentType(fp) === getCorrectType(fp);
}

async function correctImageType(fp) {
  if (!imageCorrect(fp) && ['png', 'jpg', 'jpeg'].includes(getCorrectType(fp))) {
    const newFp = fp.substr(0, fp.lastIndexOf('.') + 1) + getCorrectType(fp);
    try {
      await fsp.rename(fp, newFp);
      console.log(`Success: ${path.basename(fp)} -> ${path.basename(newFp)}`);
    } catch (err) {
      console.warn(`Error handling file: ${path.basename(fp)}`);
    }
  }
}

module.exports = correctImageType;