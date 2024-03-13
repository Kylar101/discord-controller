import { Events } from 'discord.js';

export interface ListenerMetadataArgs {
  target: Function;
  event: Events;
}
