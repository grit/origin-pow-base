import client from './client.js';

client.request('stopMining', [], (err, res) => {
  if (err) {
    throw err;
  }
  console.log(res.result);
});
