import type { ClientEvents } from 'discord.js';

export interface Listener<K extends keyof ClientEvents = 'messageCreate'> {
  listen(parameters: ClientEvents[K]): boolean | Promise<boolean>;
  run(parameters: ClientEvents[K]): void | Promise<void>;
}
