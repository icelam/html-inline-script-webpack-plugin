import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import simpleConfig from './cases/simple/webpack.config';
import multipleInstanceConfig from './cases/multiple-instance/webpack.config';
import jsWithImportConfig from './cases/js-with-import/webpack.config';
import webWorkerConfig from './cases/web-worker/webpack.config';
import inlineWebWorkerConfig from './cases/inline-web-worker/webpack.config';

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

  it('should build webpack config having inline web worker without error', async () => {
    const webpackPromise = new Promise((resolve) => {
      const compiler = webpack(inlineWebWorkerConfig);

      compiler.run((error, stats) => {
        expect(error).toBeNull();

        const statsErrors = stats?.compilation.errors;
        expect(statsErrors?.length).toBe(0);

        const result1 = fs.readFileSync(
          path.join(__dirname, 'cases/inline-web-worker/dist/index.html'),
          'utf8',
        );

        const expected1 = fs.readFileSync(
          path.join(__dirname, 'cases/inline-web-worker/expected/index.html'),
          'utf8',
        );

        expect(result1).toBe(expected1);

        const expectedFileList = fs.readdirSync(path.join(__dirname, 'cases/inline-web-worker/expected/'));
        const generatedFileList = fs.readdirSync(path.join(__dirname, 'cases/inline-web-worker/dist/'));
        expect(expectedFileList.sort()).toEqual(generatedFileList.sort());

        resolve(true);
      });
    });

    await webpackPromise;
  });
});
