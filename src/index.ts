import htmlWebpackPlugin from 'html-webpack-plugin';
import HtmlInlineScriptPlugin from './HtmlInlineScriptPlugin';

const isHtmlWebpackPluginV4 = 'getHooks' in htmlWebpackPlugin;

module.exports = isHtmlWebpackPluginV4
  ? HtmlInlineScriptPlugin
  : null;
