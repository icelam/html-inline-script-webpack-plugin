import { Compilation } from 'webpack';
import type { Compiler, WebpackPluginInstance } from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import type { HtmlTagObject } from 'html-webpack-plugin';
import { PLUGIN_PREFIX } from './constants';

class HtmlInlineScriptPlugin implements WebpackPluginInstance {
  tests: RegExp[];

  constructor(tests?: RegExp[]) {
    this.tests = tests || [/.+[.]js$/];
  }

  isFileNeedsToBeInlined(
    assetName: string
  ): boolean {
    return this.tests.some((test) => assetName.match(test));
  }

  processScriptTag(
    publicPath: string,
    assets: Compilation['assets'],
    tag: HtmlTagObject
  ): HtmlTagObject {
    if (tag.tagName !== 'script' || !tag.attributes?.src) {
      return tag;
    }

    const scriptName = (tag.attributes.src as string).replace(publicPath, '');

    if (!this.isFileNeedsToBeInlined(scriptName)) {
      return tag;
    }

    const asset = assets[scriptName];

    if (!asset) {
      return tag;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { src, ...attributesWithoutSrc } = tag.attributes;

    return {
      tagName: 'script',
      innerHTML: asset.source() as string,
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
        data.assetTags.scripts = data.assetTags.scripts.map(
          (tag: HtmlTagObject) => this.processScriptTag(publicPath, compilation.assets, tag)
        );
        return data;
      });

      compilation.hooks.processAssets.tap({
        name: `${PLUGIN_PREFIX}_PROCESS_ASSETS_STAGE_SUMMARIZE`,
        stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
      }, (assets) => {
        Object.keys(assets).forEach((assetName) => {
          if (this.isFileNeedsToBeInlined(assetName)) {
            delete assets[assetName];
          }
        });
      });
    });
  }
}

export default HtmlInlineScriptPlugin;
