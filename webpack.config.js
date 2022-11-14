const path = require("path");

module.exports = {
    entry: './src/worker.js',
    resolve: {
      extensions: ['.js'],
    },
    output: {
      filename: 'crowdis.js',
      path: path.resolve(__dirname, 'dist'),
    }
  };
