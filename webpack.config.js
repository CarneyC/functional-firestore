const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'functional-firestore.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'functionalFirestore',
  },
  target: 'node',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ],
  },
};
