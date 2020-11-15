import { Message } from 'discord.js';
import { Action } from '../../src/commands';
import { Command } from '../../src/decorator';
import { MyService } from './Service';

@Command()
export class Test extends Action {
  constructor(private service: MyService) {
    super();
  }

  async run(message: Message) {
    message.channel.send(this.service.doSomething('a message'));
  }
}
