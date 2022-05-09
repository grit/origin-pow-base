import jayson from 'jayson';
import { PORT } from '../config.js';

const client = jayson.client.http({
  port: PORT,
});

export default client;
