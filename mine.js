import Block from './models/Block.js';
import Transaction from './models/Transaction.js';
import UTXO from './models/UTXO.js';
import { db } from './db.js';

import { PUBLIC_KEY } from './config.js';

let diffPre = '0x0';
let diffInt = 63;
let TARGET_DIFFICULTY = BigInt(diffPre + 'F'.repeat(diffInt));
const BLOCK_REWARD = 10;

let mining = true;
mine();

const startMining = () => {
  mining = true;
  mine();
};

const stopMining = () => {
  mining = false;
};

function mine() {
  if (!mining) {
    return;
  }
  const block = new Block();

  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);

  block.addTransaction(coinbaseTX);

  const start = Date.now();
  while (BigInt(`0x${block.hash()}`) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }

  const stop = new Date();
  if (stop - start < 10000) {
    diffPre = diffPre + '0';
    diffInt = diffInt - 1;
  } else if (stop - start > 10000) {
    diffPre = diffPre.slice(0, -1);
    diffInt = diffInt + 1;
  }
  TARGET_DIFFICULTY = BigInt(diffPre + 'F'.repeat(diffInt));

  block.execute();

  db.blockchain.addBlock(block);
  console.log(
    `Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${
      block.nonce
    }`
  );

  setTimeout(mine, 5000);
}

export { startMining, stopMining };
