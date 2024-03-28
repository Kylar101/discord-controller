import type { ListenerMetadataArgs } from './args/ListenerMetadataArgs';
import type { ClientEvents } from 'discord.js';

export class ListenerMetadata {
  target: Function;
  event: keyof ClientEvents;

  constructor(args: ListenerMetadataArgs) {
    this.target = args.target;
    this.event = args.event as keyof ClientEvents;
  }
}
