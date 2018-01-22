const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // dynamically add bundles to html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // clean distribution on every build

const SOURCE_PATH = path.resolve(__dirname, 'src');
const DESTINATION_PATH = path.resolve(__dirname, 'dist');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${SOURCE_PATH}/index.html`,
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: `${SOURCE_PATH}/index.js`,
  output: {
    path: `${DESTINATION_PATH}`,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: [ 'file-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.css'),
    HtmlWebpackPluginConfig,
  ]
}