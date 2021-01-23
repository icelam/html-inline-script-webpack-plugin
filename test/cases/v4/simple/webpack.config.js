const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Self = require('../../../../dist');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    }),
    new Self()
  ]
};
