import { createServer } from '../../src/index';
import { Test } from './Test';

const bot = createServer({
  token: 'YOUR_AUTH_TOKEN',
  listeners: [Test]
});

bot.start();
