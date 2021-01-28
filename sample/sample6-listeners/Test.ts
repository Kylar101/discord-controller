import { Message } from 'discord.js';
import { Listener, DiscordEvents, Listen } from '../../src/';

@Listen(DiscordEvents.Message)
export class Test extends Listener {
  constructor() {
    super();
  }

  listen(message: Message) {
    return message.content.includes('hello');
  }

  run(message: Message) {
    message.channel.send('someone sent a greeting');
  }
}
