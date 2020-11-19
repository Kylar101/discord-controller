import { Message } from 'discord.js';
import { Action } from '../../src/commands';
import { Command } from '../../src/decorator';

@Command('&')
export class Test extends Action {
  constructor() {
    super();
  }

  async run(message: Message) {
    message.channel.send('sending a message with a custom prefix');
  }
}
