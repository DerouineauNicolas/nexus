const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    corto: './src/corto.js',
    nexus: './src/nexus.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  mode:'development',
    // development server options
  devServer: {
        contentBase: path.join(__dirname, "dist")
  },
};