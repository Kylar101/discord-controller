import { Message } from 'discord.js';

export interface ICommand {
  run(message: Message): void;
}