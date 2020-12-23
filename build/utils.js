const path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? 'learning-tools'
    : ''

  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  resolve,
  assetsPath,
}