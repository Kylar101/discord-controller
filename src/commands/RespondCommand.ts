import { Command } from '../package/command';
import { Message } from 'discord.js';
import { Injectable } from '../package/injectable';

@Injectable()
export class RespondCommand extends Command {

  constructor() {
    super();
  }

  public run(message: Message) {
    message.channel.send('response');
  }
}