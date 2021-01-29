import { Message } from 'discord.js';
import { Action } from '../../src/commands';
import { Command, Authorized } from '../../src/decorator';

@Authorized('AllowedRole')
@Command()
export class Test extends Action {
  constructor() {
    super();
  }

  async run(message: Message) {
    message.channel.send('This command can be used by members who have \'AllowedRole\' role');
  }
}
