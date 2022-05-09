import client from './client.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

const { address } = argv;

client.request('getBalance', [address], (err, res) => {
  if (err) {
    throw err;
  }
  console.log(res.result);
});
