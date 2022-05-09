import { startMining, stopMining } from './mine.js';
import jayson from 'jayson';
import { PORT } from './config.js';
import { db } from './db.js';

const utxos = db.utxos;

const server = jayson.server({
  startMining: (_, callback) => {
    startMining();
    callback(null, 'success!');
  },
  stopMining: (_, callback) => {
    stopMining();
    callback(null, 'success!');
  },
  getBalance: ([address], callback) => {
    const relevantUTXOs = utxos.filter((utxo) => {
      return utxo.owner === address && !utxo.spent;
    });
    const sum = relevantUTXOs.reduce((p, c) => {
      return p + c.amount;
    }, 0);
    callback(null, sum);
  },
});

server.http().listen(PORT);
