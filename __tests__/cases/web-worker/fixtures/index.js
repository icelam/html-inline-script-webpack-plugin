const worker = new Worker(new URL(/* webpackChunkName: 'test.worker' */'./worker.js', import.meta.url));

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
