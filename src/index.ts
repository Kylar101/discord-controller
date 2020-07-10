import Discord from 'discord.js';
import { prefix, token } from './config.json';
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', (message: Discord.Message) => {
  if (message.content.startsWith(`${prefix}respond`)) {
    message.channel.send('response');
  }
});

client.login(token);