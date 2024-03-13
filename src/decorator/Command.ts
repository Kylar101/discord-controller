import { getMetadataStorage } from '../';
import { CommandOptions } from '../metadata';

export function Command(options: CommandOptions): Function {
  return function (object: Function) {
    getMetadataStorage().commands.push({
      target: object,
      options
    });
  };
}