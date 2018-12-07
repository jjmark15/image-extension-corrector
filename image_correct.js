const readChunk = require('read-chunk'); // npm install read-chunk
const imageType = require('image-type');
const fs = require('fs');
const path = require('path');


function getCorrectType(fp) {
  const buffer = readChunk.sync(fp, 0, 12);

  if (imageType(buffer) === null) {
    return null;
  } else {
    return imageType(buffer).ext;
  }
}

function getCurrentType(fp) {
  return fp.substr((fp.lastIndexOf('.') + 1));
}

function imageCorrect(fp) {
  return getCurrentType(fp) === getCorrectType(fp);
}

function correctImageType(fp) {
  if (!imageCorrect(fp) && ['png', 'jpg', 'jpeg'].includes(getCorrectType(fp))) {
    const newFp = fp.substr(0, fp.lastIndexOf('.') + 1) + getCorrectType(fp)
    fs.rename(fp, newFp, (err) => {
      if (err) throw err;
      console.log(`Success: ${path.basename(fp)} -> ${path.basename(newFp)}`);
    });
    return 1;
  } else {
    return 0;
  }
}

module.exports = correctImageType;