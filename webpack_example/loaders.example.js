module.exports = [
  {
    test: /\.ts$/,
    loader: 'ts-loader?compiler=typescript',
    exclude: /node_modules/
  },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    loader: 'raw?name=resources/[name]-[hash].[ext]'
  }
];