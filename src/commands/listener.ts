import { Message } from 'discord.js';

export abstract class Listener {
  abstract listen(message: Message): boolean | Promise<boolean>;
  abstract run(message: Message): void | Promise<void>;
}
