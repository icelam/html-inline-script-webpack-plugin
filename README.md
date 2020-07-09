# HTML Inline Script Webpack Plugin (html-inline-script-webpack-plugin)
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
