var path = require('path');
var webpack = require('webpack');
var loaders = require('./loaders');

module.exports = {
  entry: ['./src/SpinnerModule.ts'],
  output: {
    path: 'dist',
    libraryTarget: 'umd',
    filename: 'rbo-spin.js'
  },
  externals: {
    'angular': 'angular',
    'jquery': 'jquery'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: loaders
  }
};