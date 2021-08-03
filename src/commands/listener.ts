import { ClientEvents } from 'discord.js';

export interface Listener<K extends keyof ClientEvents = 'message'> {
  listen(parameters: ClientEvents[K]): boolean | Promise<boolean>;
  run(parameters: ClientEvents[K]): void | Promise<void>;
}
