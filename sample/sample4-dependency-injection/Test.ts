import { Action, Command, Interaction } from 'discord-controller';
import { MyService } from './Service';

@Command({ description: 'This is the description' })
export class Test extends Action {
  constructor(private service: MyService) {
    super();
  }

  async run(message: Interaction) {
    await message.reply(this.service.doSomething('a message'));
  }
}