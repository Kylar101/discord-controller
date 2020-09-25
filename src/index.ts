import { prefix, token } from './config.json';
import { DiscordBot } from './package/bot';

const bot = new DiscordBot({ prefix, token});

bot.start();