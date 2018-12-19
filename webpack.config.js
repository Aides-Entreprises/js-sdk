const path = require('path');

module.exports = {
  entry: './src/Sdk.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'aides-entreprises-sdk.js'
  }
};
