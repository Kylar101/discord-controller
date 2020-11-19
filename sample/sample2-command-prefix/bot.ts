import { createServer } from '../../src/index';

const bot = createServer({
  token: 'YOUR_AUTH_TOKEN',
  commands: []
});

bot.start();
