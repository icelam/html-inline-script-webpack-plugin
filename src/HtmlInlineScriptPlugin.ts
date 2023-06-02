import { Compilation } from 'webpack';
import type { Compiler, WebpackPluginInstance } from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import type { HtmlTagObject } from 'html-webpack-plugin';
import { PLUGIN_PREFIX } from './constants';

export type PluginOptions = {
  scriptMatchPattern?: RegExp[];
  htmlMatchPattern?: RegExp[];
  preserveAsset?: RegExp[];
};

class HtmlInlineScriptPlugin implements WebpackPluginInstance {
  scriptMatchPattern: NonNullable<PluginOptions['scriptMatchPattern']>;

  htmlMatchPattern: NonNullable<PluginOptions['htmlMatchPattern']>;

  processedScriptFiles: string[];

  ignoredHtmlFiles: string[];

  preserveAsset: NonNullable<PluginOptions['preserveAsset']>;

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
      preserveAsset = [],
    } = options;

    this.scriptMatchPattern = scriptMatchPattern;
    this.htmlMatchPattern = htmlMatchPattern;
    this.processedScriptFiles = [];
    this.preserveAsset = preserveAsset;
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
    return this.preserveAsset.some((test) => assetName.match(test));
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

  apply(compiler: Compiler): void {
    let publicPath = compiler.options?.output?.publicPath as string || '';

    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap(`${PLUGIN_PREFIX}_compilation`, (compilation) => {
      const hooks = htmlWebpackPlugin.getHooks(compilation);

      hooks.alterAssetTags.tap(`${PLUGIN_PREFIX}_alterAssetTags`, (data) => {
        const htmlFileName = data.plugin.options?.filename;

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
