import { ClientEvents } from 'discord.js';

export abstract class Listener<K extends keyof ClientEvents = 'message'> {
  abstract listen(parameters: ClientEvents[K]): boolean | Promise<boolean>;
  abstract run(parameters: ClientEvents[K]): void | Promise<void>;
}
