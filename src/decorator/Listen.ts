import { getMetadataStorage } from '../';
import { DiscordEvents } from '../types';

export function Listen(event: DiscordEvents): Function {
  return function(object: Function) {
    getMetadataStorage().listeners.push({
      target: object,
      event
    });
  }
}
