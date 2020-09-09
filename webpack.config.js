const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './client/index.js')
  },
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
  },
  mode: 'production'
};