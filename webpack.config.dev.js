var path = require('path');
var webpack = require('webpack');
var port = '9090';
module.exports = {
   entry: [
   'babel-polyfill',
    './src/index'
  ],
  output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'

  },
  resolve: {
      modulesDirectories: ['node_modules', 'src'],
      extensions: ['', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|id/),
  ],
  module: {
    loaders: [{ test: /\.js$/, loaders: ['babel'],exclude: /node_modules/},
              { test: require.resolve("jquery"), loader: "imports?jQuery=jquery" },
              { test: /\.css$/, loader: 'style-loader!css-loader' },
              { test: /\.woff|\.woff2|\.svg|.eot|\.ttf|\.jpg/, loader : 'url?prefix=font/&limit=10000' }
             ]
  }
};
