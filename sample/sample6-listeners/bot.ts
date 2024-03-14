import { createServer } from 'discord-controller';
import { Test } from './Test';

(async () => {
  try {
    const bot = await createServer({
      permissions: [],
      token: 'TOKEN',
      guildId: 'GUILD_ID',
      clientId: 'CLIENT_ID',
      listeners: [
        Test,
      ],
    });
    bot.start();
  } catch (e) {
    console.log('Unable to start bot');
  }
})();
