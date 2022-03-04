const path = require('path');

exports.module = {
  entry: './src/main.ts',
  output: {
    __filename: 'output.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtools: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
