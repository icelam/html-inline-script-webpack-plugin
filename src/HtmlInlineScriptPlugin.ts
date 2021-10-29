import type { Compiler, Plugin } from 'webpack';
import type { RawSource } from 'webpack-sources';
import htmlWebpackPlugin from 'html-webpack-plugin';
import type { HtmlTagObject } from 'html-webpack-plugin';
import { PLUGIN_PREFIX } from './constants';

class HtmlInlineScriptPlugin implements Plugin {
  tests: RegExp[];

  processedScriptFiles: string[];

  constructor(tests?: RegExp[]) {
    this.tests = tests || [/.+[.]js$/];
    this.processedScriptFiles = [];
  }

  isFileNeedsToBeInlined(
    assetName: string
  ): boolean {
    return this.tests.some((test) => assetName.match(test));
  }

  processScriptTag(
    publicPath: string,
    assets: { [key: string]: RawSource },
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

    this.processedScriptFiles.push(scriptName);

    return {
      tagName: 'script',
      innerHTML: asset.source(),
      voidTag: false,
      attributes: attributesWithoutSrc
    };
  }

  apply(compiler: Compiler): void {
    let publicPath = compiler.options?.output?.publicPath || '';

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
    });

    compiler.hooks.emit.tap(`${PLUGIN_PREFIX}_emit`, (compilation) => {
      this.processedScriptFiles.forEach((assetName) => {
        delete compilation.assets[assetName];
      });
    });
  }
}

export default HtmlInlineScriptPlugin;
