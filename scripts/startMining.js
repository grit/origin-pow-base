import client from './client.js';

client.request('startMining', [], (err, res) => {
  if (err) {
    throw err;
  }
  console.log(res.result);
});
