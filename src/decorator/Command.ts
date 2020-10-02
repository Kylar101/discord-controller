import { CommandMetaDataArgs } from '../metadata';
import { getMetadataStorage } from '../';

export function Command(prefix?: string, options?: CommandMetaDataArgs): Function {
  return function (object: Function) {
    getMetadataStorage().commands.push({
      target: object,
      prefix,
      options
    });
  };
}