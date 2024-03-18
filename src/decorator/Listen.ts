import type { Events } from 'discord.js';
import { getMetadataStorage } from '../';

export function Listen(event: Events.MessageCreate): Function {
  return (object: Function) => {
    getMetadataStorage().listeners.push({
      target: object,
      event,
    });
  };
}
