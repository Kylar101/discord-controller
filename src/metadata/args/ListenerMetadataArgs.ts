import { ClientEvents } from 'discord.js';

export interface ListenerMetadataArgs {
  target: Function;
  event: keyof ClientEvents;
}
