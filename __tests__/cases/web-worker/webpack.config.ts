import path from 'path';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Self from '../../../dist';

const config: Configuration = {
  mode: 'production',
  entry: path.join(__dirname, './fixtures/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
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
        test: /worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { filename: 'test.worker.js' }
        }
      }
    ]
  }
};

export default config;
