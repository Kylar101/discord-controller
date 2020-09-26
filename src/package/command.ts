import { Message } from 'discord.js';

export interface ICommand {
  run(message: Message): void;
}

export abstract class Command {
  protected abstract run(message: Message): void;
}