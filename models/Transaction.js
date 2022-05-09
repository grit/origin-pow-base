import { db } from '../db.js';

const utxos = db.utxos;

export default class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }
  execute() {
    this.inputs.forEach((input) => {
      input.spent = true;
    });
    this.outputs.forEach((output) => {
      utxos.push(output);
    });
  }
}
