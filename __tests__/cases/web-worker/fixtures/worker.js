onmessage = function (event) {
  const workerResult = { timestamp: Date.now(), ...event.data };

  workerResult.onmessage = true;

  postMessage(workerResult);
};
