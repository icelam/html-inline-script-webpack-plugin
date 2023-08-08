import path from 'path';
import { Compilation } from 'webpack';
import type { Compiler, WebpackPluginInstance } from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import type { HtmlTagObject } from 'html-webpack-plugin';
import { PLUGIN_PREFIX } from './constants';

export type PluginOptions = {
  scriptMatchPattern?: RegExp[];
  htmlMatchPattern?: RegExp[];
  assetPreservePattern?: RegExp[];
};

class HtmlInlineScriptPlugin implements WebpackPluginInstance {
  scriptMatchPattern: NonNullable<PluginOptions['scriptMatchPattern']>;

  htmlMatchPattern: NonNullable<PluginOptions['htmlMatchPattern']>;

  processedScriptFiles: string[];

  ignoredHtmlFiles: string[];

  assetPreservePattern: NonNullable<PluginOptions['assetPreservePattern']>;

  constructor(options: PluginOptions = {}) {
    if (options && Array.isArray(options)) {
      // eslint-disable-next-line no-console
      console.error(
        '\x1b[35m%s \x1b[31m%s %s\x1b[0m',
        '[html-inline-script-webpack-plugin]',
        'Options is now an object containing `scriptMatchPattern` and `htmlMatchPattern` in version 3.x.',
        'Please refer to documentation for more information.'
      );

      throw new Error('OPTIONS_PATTERN_UNMATCHED');
    }

    const {
      scriptMatchPattern = [/.+[.]js$/],
      htmlMatchPattern = [/.+[.]html$/],
      assetPreservePattern = []
    } = options;

    this.scriptMatchPattern = scriptMatchPattern;
    this.htmlMatchPattern = htmlMatchPattern;
    this.processedScriptFiles = [];
    this.assetPreservePattern = assetPreservePattern;
    this.ignoredHtmlFiles = [];
  }

  isFileNeedsToBeInlined(
    assetName: string
  ): boolean {
    return this.scriptMatchPattern.some((test) => assetName.match(test));
  }

  isFileNeedsToBePreserved(
    assetName: string
  ): boolean {
    return this.assetPreservePattern.some((test) => assetName.match(test));
  }

  shouldProcessHtml(
    templateName: string
  ): boolean {
    return this.htmlMatchPattern.some((test) => templateName.match(test));
  }

  processScriptTag(
    publicPath: string,
    assets: Compilation['assets'],
    tag: HtmlTagObject
  ): HtmlTagObject {
    if (tag.tagName !== 'script' || !tag.attributes?.src) {
      return tag;
    }

    // Decoded is needed for special characters in filename like '@' since they will be escaped
    const scriptName = decodeURIComponent((tag.attributes.src as string).replace(publicPath, ''));

    if (!this.isFileNeedsToBeInlined(scriptName)) {
      return tag;
    }

    const asset = assets[scriptName];

    if (!asset) {
      return tag;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { src, ...attributesWithoutSrc } = tag.attributes;
    this.processedScriptFiles.push(scriptName);

    return {
      tagName: 'script',
      // escape '</script>' appears in source
      innerHTML: (asset.source() as string).replace(/(<)(\/script>)/g, '\\x3C$2'),
      voidTag: false,
      attributes: attributesWithoutSrc,
      meta: { plugin: 'html-inline-script-webpack-plugin' }
    };
  }

  getPublicPath(
    compilation: Compilation,
    htmlFileName: string,
    customPublicPath: string
  ): string {
    const webpackPublicPath = compilation.getAssetPath(
      compilation.outputOptions.publicPath as string,
      { hash: compilation.hash }
    );
    // Webpack 5 introduced "auto" as default value
    const isPublicPathDefined = webpackPublicPath !== 'auto';

    let publicPath = '';

    if (customPublicPath !== 'auto') {
      // If the html-webpack-plugin options contain a custom public path uset it
      publicPath = customPublicPath;
    } else if (isPublicPathDefined) {
      // If a hard coded public path exists in webpack config use it
      publicPath = webpackPublicPath;
    } else if (compilation.options.output.path) {
      // If no public path for webpack and html-webpack-plugin was set get a relative url path
      publicPath = path.relative(
        path.resolve(compilation.options.output.path, path.dirname(htmlFileName)),
        compilation.options.output.path
      ).split(path.sep).join('/');
    }

    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    return publicPath;
  }

  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(`${PLUGIN_PREFIX}_compilation`, (compilation) => {
      const hooks = htmlWebpackPlugin.getHooks(compilation);

      hooks.alterAssetTags.tap(`${PLUGIN_PREFIX}_alterAssetTags`, (data) => {
        const htmlFileName = data.plugin.options?.filename;
        const publicPath = this.getPublicPath(compilation, data.outputName, data.publicPath);

        if (htmlFileName && !this.shouldProcessHtml(htmlFileName)) {
          this.ignoredHtmlFiles.push(htmlFileName);
          return data;
        }

        data.assetTags.scripts = data.assetTags.scripts.map(
          (tag: HtmlTagObject) => this.processScriptTag(publicPath, compilation.assets, tag)
        );
        return data;
      });

      compilation.hooks.processAssets.tap({
        name: `${PLUGIN_PREFIX}_PROCESS_ASSETS_STAGE_SUMMARIZE`,
        stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
      }, (assets) => {
        if (this.ignoredHtmlFiles.length === 0) {
          this.processedScriptFiles.forEach((assetName) => {
            if (!this.isFileNeedsToBePreserved(assetName)) {
              delete assets[assetName];
            }
          });
        }
      });
    });
  }
}

export default HtmlInlineScriptPlugin;
