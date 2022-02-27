import path from 'path';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Self from '../../../dist';

const config: Configuration = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, './fixtures/index.js'),
    'non-inline': path.join(__dirname, './fixtures/non-inline.js')
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
    new Self({
      scriptMatchPattern: [/index.js$/]
    })
  ]
};

export default config;
