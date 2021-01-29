import { DiscordEvents } from '../../types';

export interface ListenerMetadataArgs {
  target: Function;
  event: DiscordEvents;
}
