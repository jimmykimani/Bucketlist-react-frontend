const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const DESTINATION_PATH = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `${DESTINATION_PATH}`,
    hot: true,
    publicPath: '/'
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
});