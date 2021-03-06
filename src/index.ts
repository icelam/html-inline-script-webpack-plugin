import htmlWebpackPlugin from 'html-webpack-plugin';
import HtmlInlineScriptPlugin from './HtmlInlineScriptPlugin';

const isHtmlWebpackPluginV4 = 'getHooks' in htmlWebpackPlugin;

if (!isHtmlWebpackPluginV4) {
  // eslint-disable-next-line no-console
  console.error(
    '\x1b[35m%s \x1b[31m%s\x1b[0m',
    '[html-inline-script-webpack-plugin]',
    'Please upgrade your webpack to version 4 to use this plugin.'
  );

  throw new Error('VERSION_INCOMPATIBLE');
}

export = HtmlInlineScriptPlugin;
