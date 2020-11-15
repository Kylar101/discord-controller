import { Message } from 'discord.js';
import { Action } from '../../src/commands';
import { Command, Flag } from '../../src/decorator';

@Command()
export class Test extends Action {
  constructor() {
    super();
  }

  async run(message: Message) {
    message.channel.send('sending a message');
  }

  @Flag()
  async myFlag(message: Message) {
    message.channel.send('sending a message from a flag');
  }
}
