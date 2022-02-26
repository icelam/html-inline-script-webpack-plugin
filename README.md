# HTML Inline Script Webpack Plugin for webpack (html-inline-script-webpack-plugin)

[![Latest version](https://img.shields.io/github/v/release/icelam/html-inline-script-webpack-plugin.svg?sort=semver&label=latest)](https://github.com/icelam/html-inline-script-webpack-plugin/releases)
[![Download count](https://img.shields.io/npm/dm/html-inline-script-webpack-plugin)](https://www.npmjs.com/package/html-inline-script-webpack-plugin)
[![Install size](https://packagephobia.com/badge?p=html-inline-script-webpack-plugin)](https://packagephobia.com/result?p=html-inline-script-webpack-plugin)
![ci](https://github.com/icelam/html-inline-script-webpack-plugin/workflows/ci/badge.svg)
[![Package quality](https://npm.packagequality.com/shield/html-inline-script-webpack-plugin.svg)](https://packagequality.com/#?package=html-inline-script-webpack-plugin)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/icelam/html-inline-script-webpack-plugin.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/icelam/html-inline-script-webpack-plugin/context:javascript)

[![NPM](https://nodei.co/npm/html-inline-script-webpack-plugin.png?compact=true)](https://npmjs.org/package/html-inline-script-webpack-plugin)

A webpack plugin for converting external script files `<script src="app.js"></script>` to inline script block `<script>...</script>`. Requires [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to work.

Inspired by [react-dev-utils](https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/InlineChunkHtmlPlugin.js) created by [Facebook](https://github.com/facebook/).

## Install

### Webpack5

#### NPM

```bash
npm i html-inline-script-webpack-plugin -D
```

#### Yarn

```bash
yarn add html-inline-script-webpack-plugin -D
```

### Webpack4

#### NPM

```bash
npm i html-inline-script-webpack-plugin@^1 -D
```

#### Yarn

```bash
yarn add html-inline-script-webpack-plugin@^1 -D
```

## Usage

By default, the plugin will convert all the external script files to inline script block.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  plugins: [new HtmlWebpackPlugin(), new HtmlInlineScriptPlugin()],
};
```

## Options

Below are lists of options supported by this plugin:

| Name               | Description                                                                                                                                                                                                                                                                             | Type     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| scriptMatchPattern | List of script files that should be processed and inject as inline script. This will be filtered using the output file name.                                                                                                                                                     | RegExp[] |
| htmlMatchPattern   | List of HTML template files that should be processed by this plugin. Useful when you have multiple `html-webpack-plugin` initialized. This will be filtered using the [`options?.filename`](https://github.com/jantimon/html-webpack-plugin#options) provided by `html-webpack-plugin`. | RegExp[] |

Here are some examples illustrating how to use these options:

##### Process only script files that have file name start with `runtime~` and `app~`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/runtime~.+[.]js$/, /app~.+[.]js$/],
    }),
  ],
};
```

##### Process any script files but only have them inlined in `index.html`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'static/index.webos.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      template: 'page2.html',
    }),
    new HtmlInlineScriptPlugin({
      htmlMatchPattern: [/index.html$/],
    }),
  ],
};
```

##### Process script files that have file name start with `runtime~` and `app~` and inject only to `index.html`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'static/index.webos.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      template: 'page2.html',
    }),
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/runtime~.+[.]js$/, /app~.+[.]js$/],
      htmlMatchPattern: [/index.html$/],
    }),
  ],
};
```
