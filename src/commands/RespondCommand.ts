import { ICommand } from 'src/package/command';
import { Message } from 'discord.js';
import { Command } from '../package/decorators/command';

@Command()
export class Respond implements ICommand {
  public run(message: Message) {
    message.channel.send('response');
  }
}