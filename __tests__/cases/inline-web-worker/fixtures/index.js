// This file will be loaded as raw text as configured via webpack and asssets-loader
// eslint-disable-next-line import/extensions, import/no-unresolved
import workerSource from './worker.js?raw';

const blob = new Blob([
  workerSource
]);

// Obtain a blob URL reference to our worker 'file'.
const blobURL = window.URL.createObjectURL(blob);

const worker = new Worker(blobURL);

let result;

worker.onmessage = function (event) {
  if (!result) {
    result = document.createElement('div');
    result.setAttribute('id', 'result');

    document.body.append(result);
  }

  const record = document.createElement('pre');
  record.innerHTML = JSON.stringify(event.data);

  result.append(record);
};

window.addEventListener('load', () => {
  const button = document.getElementById('button');

  button.addEventListener('click', () => {
    worker.postMessage({ postMessage: true });
  });
});
