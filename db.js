import Blockchain from './models/Blockchain.js';

export const db = {
  blockchain: new Blockchain(),
  utxos: [],
};
