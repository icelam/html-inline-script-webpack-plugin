import path from 'path';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Self from '../../../dist';

const config: Configuration = {
  mode: 'production',
  entry: {
    ui: path.join(__dirname, './fixtures/index.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['ui'],
      template: path.resolve(__dirname, './fixtures/index.html')
    }),
    new Self({
      preserveAsset: (asset) => asset === 'ui.js'
    })
  ]
};

export default config;
