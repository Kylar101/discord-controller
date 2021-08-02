import { ListenerMetadataArgs } from './args/ListenerMetadataArgs';
import { ClientEvents } from 'discord.js';

export class ListenerMetadata {

  target: Function;
  event: keyof ClientEvents;

  constructor(args: ListenerMetadataArgs) {
    this.target = args.target;
    this.event = args.event;
  }
}
