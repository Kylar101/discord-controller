import { prefix, token } from './config.json';
import { DiscordBot } from './package/bot';
import { RespondCommand } from './commands/RespondCommand';

const bot = new DiscordBot({ prefix, token}, [
  RespondCommand
]);

bot.start();