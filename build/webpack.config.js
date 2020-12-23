const base = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.prod.config.js');
} else {
  config = require('./webpack.dev.config.js');
}
module.exports = merge(base, config);