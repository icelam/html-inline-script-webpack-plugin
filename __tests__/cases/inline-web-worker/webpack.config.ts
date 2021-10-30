import path from 'path';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Self from '../../../dist';

const config: Configuration = {
  mode: 'production',
  entry: path.join(__dirname, './fixtures/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './fixtures/index.html')
    }),
    new Self()
  ],
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - according to assets-loader, it is a proper usage to use 'asset/source'
        type: 'asset/source'
      }
    ]
  }
};

export default config;
