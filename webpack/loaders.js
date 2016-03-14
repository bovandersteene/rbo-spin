module.exports = [
  {
    test: /\.ts$/,
    loader: 'ts-loader?compiler=typescript',
    exclude: /node_modules/
  },
  {
    test: /\.scss$/,
    loader: 'style!css!sass?name=resources/[name]-[hash].[ext]'
  }
];