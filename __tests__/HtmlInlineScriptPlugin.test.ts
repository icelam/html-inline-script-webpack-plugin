import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import Self from '../dist';

import simpleConfig from './cases/simple/webpack.config';
import preserveConfig from './cases/preserveAsset/webpack.config';
import multipleInstanceConfig from './cases/multiple-instance/webpack.config';
import jsWithImportConfig from './cases/js-with-import/webpack.config';
import webWorkerConfig from './cases/web-worker/webpack.config';
import ignoreScriptsConfig from './cases/ignore-scripts/webpack.config';
import ignoreHtmlsConfig from './cases/ignore-htmls/webpack.config';
import ignoreScriptsAndHtmlsConfig from './cases/ignore-scripts-and-htmls/webpack.config';
import filenameWithSpecialCharactersConfig from './cases/filename-with-special-characters/webpack.config';
import escapeScriptTagEndConfig from './cases/escape-script-end-tag/webpack.config';

describe('HtmlInlineScriptPlugin', () => {
  it('should build simple webpack config without error', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(simpleConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result = fs.readFileSync(
          path.join(__dirname, 'cases/simple/dist/index.html'),
          'utf8',
        );

        const expected = fs.readFileSync(
          path.join(__dirname, 'cases/simple/expected/index.html'),
          'utf8',
        );
        expect(result).toBe(expected);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/simple/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/simple/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should preserve the output of an asset if requested', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(preserveConfig);
      console.log(preserveConfig)

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result = fs.readFileSync(
          path.join(__dirname, 'cases/preserveAsset/dist/index.html'),
          'utf8',
        );

        const expected = fs.readFileSync(
          path.join(__dirname, 'cases/preserveAsset/expected/index.html'),
          'utf8',
        );
        expect(result).toBe(expected);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/preserveAsset/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/preserveAsset/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });


  it('should build webpack config having multiple HTML webpack plugin instance without error', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(multipleInstanceConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result1 = fs.readFileSync(
          path.join(__dirname, 'cases/multiple-instance/dist/index.html'),
          'utf8',
        );

        const expected1 = fs.readFileSync(
          path.join(__dirname, 'cases/multiple-instance/expected/index.html'),
          'utf8',
        );

        expect(result1).toBe(expected1);

        const result2 = fs.readFileSync(
          path.join(__dirname, 'cases/multiple-instance/dist/page2.html'),
          'utf8',
        );

        const expected2 = fs.readFileSync(
          path.join(__dirname, 'cases/multiple-instance/expected/page2.html'),
          'utf8',
        );

        expect(result2).toBe(expected2);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/multiple-instance/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/multiple-instance/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should build webpack config having JS file with import without error', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(jsWithImportConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result1 = fs.readFileSync(
          path.join(__dirname, 'cases/js-with-import/dist/index.html'),
          'utf8',
        );

        const expected1 = fs.readFileSync(
          path.join(__dirname, 'cases/js-with-import/expected/index.html'),
          'utf8',
        );

        expect(result1).toBe(expected1);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/js-with-import/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/js-with-import/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should build webpack config having web worker without error', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(webWorkerConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result1 = fs.readFileSync(
          path.join(__dirname, 'cases/web-worker/dist/index.html'),
          'utf8',
        );

        const expected1 = fs.readFileSync(
          path.join(__dirname, 'cases/web-worker/expected/index.html'),
          'utf8',
        );

        expect(result1).toBe(expected1);

        const result2 = fs.readFileSync(
          path.join(__dirname, 'cases/web-worker/dist/test.worker.js'),
          'utf8',
        );

        const expected2 = fs.readFileSync(
          path.join(__dirname, 'cases/web-worker/expected/test.worker.js'),
          'utf8',
        );

        expect(result2).toBe(expected2);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/web-worker/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/web-worker/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should inline filename with spacial characters without error', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(filenameWithSpecialCharactersConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result = fs.readFileSync(
          path.join(__dirname, 'cases/filename-with-special-characters/dist/index.html'),
          'utf8',
        );

        const expected = fs.readFileSync(
          path.join(__dirname, 'cases/filename-with-special-characters/expected/index.html'),
          'utf8',
        );
        expect(result).toBe(expected);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/filename-with-special-characters/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/filename-with-special-characters/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should respect plugin options on script matching pattern', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(ignoreScriptsConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result1 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-scripts/dist/index.html'),
          'utf8',
        );

        const expected1 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-scripts/expected/index.html'),
          'utf8',
        );

        expect(result1).toBe(expected1);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/ignore-scripts/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/ignore-scripts/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should respect plugin options on html template matching pattern', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(ignoreHtmlsConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result1 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-htmls/dist/index.html'),
          'utf8',
        );

        const expected1 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-htmls/expected/index.html'),
          'utf8',
        );

        expect(result1).toBe(expected1);

        const result2 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-htmls/dist/page2.html'),
          'utf8',
        );

        const expected2 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-htmls/expected/page2.html'),
          'utf8',
        );

        expect(result2).toBe(expected2);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/ignore-htmls/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/ignore-htmls/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should respect plugin options on both script matching pattern and html template matching pattern', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(ignoreScriptsAndHtmlsConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result1 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-scripts-and-htmls/dist/index.html'),
          'utf8',
        );

        const expected1 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-scripts-and-htmls/expected/index.html'),
          'utf8',
        );

        expect(result1).toBe(expected1);

        const result2 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-scripts-and-htmls/dist/page2.html'),
          'utf8',
        );

        const expected2 = fs.readFileSync(
          path.join(__dirname, 'cases/ignore-scripts-and-htmls/expected/page2.html'),
          'utf8',
        );

        expect(result2).toBe(expected2);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/ignore-scripts-and-htmls/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/ignore-scripts-and-htmls/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should escape any "</script>" appears in source', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(escapeScriptTagEndConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result = fs.readFileSync(
          path.join(__dirname, 'cases/escape-script-end-tag/dist/index.html'),
          'utf8',
        );

        const expected = fs.readFileSync(
          path.join(__dirname, 'cases/escape-script-end-tag/expected/index.html'),
          'utf8',
        );
        expect(result).toBe(expected);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/escape-script-end-tag/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/escape-script-end-tag/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });

  it('should build throw error if options passed to plugin is old options format', async () => {
    const initializedPlugin = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-new
      new Self([/runtime~.+[.]js$/, /app~.+[.]js$/] as any);
    };
    expect(initializedPlugin).toThrow();
  });
});
