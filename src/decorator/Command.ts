import { getMetadataStorage } from '../';
import type { CommandOptions } from '../metadata';

export function Command(options: CommandOptions): Function {
  return (object: Function) => {
    getMetadataStorage().commands.push({
      target: object,
      options,
    });
  };
}
