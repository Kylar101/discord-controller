import { Message } from 'discord.js';

export abstract class Listener {
  abstract listen(message: Message): void;
  abstract run(message: Message): void;
}
