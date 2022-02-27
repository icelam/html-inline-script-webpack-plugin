import { version as webpackVersion } from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import HtmlInlineScriptPlugin from './HtmlInlineScriptPlugin';

const isHtmlWebpackPluginV3 = !('getHooks' in htmlWebpackPlugin);
const isHtmlWebpackPluginV4 = webpackVersion.startsWith('4.');
const isUnsupportedVersion = isHtmlWebpackPluginV3 || isHtmlWebpackPluginV4;

if (isUnsupportedVersion) {
  // eslint-disable-next-line no-console
  console.error(
    '\x1b[35m%s \x1b[31m%s\x1b[0m',
    '[html-inline-script-webpack-plugin]',
    'Version 3.x only supports webpack 5. If you are using webpack 4, please downgrade this plugin to version 1.x instead.'
  );

  throw new Error('VERSION_INCOMPATIBLE');
}

export = HtmlInlineScriptPlugin;
