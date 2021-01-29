import { ListenerMetadataArgs } from './args/ListenerMetadataArgs';
import { DiscordEvents } from '../types';

export class ListenerMetadata {

  target: Function;
  event: DiscordEvents;

  constructor(args: ListenerMetadataArgs) {
    this.target = args.target;
    this.event = args.event;
  }
}
