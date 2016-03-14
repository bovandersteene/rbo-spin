var path = require('path');
var webpack = require('webpack');
var loaders = require('./loaders.example');
var plugins = require('./plugins');

module.exports = {
  entry: './example/index.ts',
  output: {
    path: './out/example',
    filename: 'example.js'
  },
  module: {
    loaders: loaders
  },
  externals: [
    {
      'window': 'window'
    }
  ],
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json'],
    alias: {
      'rbo-spin': path.resolve( './dist/rbo-spin')
    }
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './out/example'
  },
  plugins: plugins
};