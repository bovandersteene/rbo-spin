
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  [
  new HtmlWebpackPlugin({
    template: './example/index.html',
    inject: 'body',
    minify: false,
    hash: true
  }),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 9090,
    server: {
      baseDir: './out/example'
    },
    ui: false,
    online: false,
    notify: false
  })
];