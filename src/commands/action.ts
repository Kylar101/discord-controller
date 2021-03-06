import { Message } from 'discord.js';

export abstract class Action {
  abstract run(message: Message): Promise<void> | void;
}
