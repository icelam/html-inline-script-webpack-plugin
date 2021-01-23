# HTML Inline Script Webpack Plugin for webpack 4 (html-inline-script-webpack-plugin)

[![Latest version](https://img.shields.io/github/v/release/icelam/html-inline-script-webpack-plugin.svg?sort=semver&label=latest)](https://github.com/icelam/html-inline-script-webpack-plugin/releases)
[![Download count](https://img.shields.io/npm/dm/html-inline-script-webpack-plugin)](https://www.npmjs.com/package/html-inline-script-webpack-plugin)
[![Install size](https://packagephobia.com/badge?p=html-inline-script-webpack-plugin)](https://packagephobia.com/result?p=html-inline-script-webpack-plugin)
![ci](https://github.com/icelam/html-inline-script-webpack-plugin/workflows/ci/badge.svg)
[![Package quality](https://npm.packagequality.com/shield/html-inline-script-webpack-plugin.svg)](https://packagequality.com/#?package=html-inline-script-webpack-plugin)

A webpack plugin for converting external script files `<script src="app.js"></script>` to inline script block `<script>...</script>`. Requires [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to work.

Inspired by [react-dev-utils](https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/InlineChunkHtmlPlugin.js) created by [Facebook](https://github.com/facebook/).

## Install
### NPM
```bash
npm i html-inline-script-webpack-plugin -D
```
### Yarn
```bash
yarn add html-inline-script-webpack-plugin -D
```

## Usage
By default, the plugin will convert all the external script files to inline script block.
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlInlineScriptPlugin(),
  ]
}
```

To limit the scope of the plugin, specify lists of files you wish to convert in regular expressions:
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlInlineScriptPlugin([
      /runtime~.+[.]js/,
      /app~.+[.]js/
    ]),
  ]
}
```
