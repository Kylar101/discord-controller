import { Events } from 'discord.js';
import { getMetadataStorage } from '../';

export function Listen(event: Events.MessageCreate): Function {
  return function (object: Function) {
    getMetadataStorage().listeners.push({
      target: object,
      event
    });
  };
}
