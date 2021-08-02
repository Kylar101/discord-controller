import { ClientEvents } from 'discord.js';
import { getMetadataStorage } from '../';

export function Listen(event: keyof ClientEvents): Function {
  return function(object: Function) {
    getMetadataStorage().listeners.push({
      target: object,
      event
    });
  };
}
