import { Message } from 'discord.js';

export abstract class Action {
  abstract run(message: Message, args?: string[]): Promise<void> | void;
}
