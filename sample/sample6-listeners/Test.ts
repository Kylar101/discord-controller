import { ClientEvents } from 'discord.js';
import { Listener, DiscordEvents, Listen } from '../../src/';

@Listen(DiscordEvents.Message)
export class Test implements Listener<DiscordEvents.Message> {

  listen(parameters: ClientEvents[DiscordEvents.Message]) {
    const [ message ] = parameters;
    return message.content.includes('hello');
  }

  run(parameters: ClientEvents[DiscordEvents.Message]) {
    const [ message ] = parameters;
    message.channel.send('someone sent a greeting');
  }
}
