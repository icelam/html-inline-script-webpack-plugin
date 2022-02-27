import path from 'path';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Self from '../../../dist';

const config: Configuration = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, './fixtures/index.js'),
    page2: path.join(__dirname, './fixtures/page2.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './fixtures/index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './fixtures/page2.html'),
      filename: 'page2.html'
    }),
    new Self({
      scriptMatchPattern: [/index.js$/],
      htmlMatchPattern: [/index.html$/]
    })
  ]
};

export default config;
