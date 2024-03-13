import { getMetadataStorage } from '../';
import { FlagOptions } from '../metadata';

export function Flag(name: string, options: FlagOptions): Function {
  return function (object: Function, _methodName: string, order: number) {
    getMetadataStorage().flags.push({
      target: object.constructor,
      method: name,
      options,
      order
    });
  };
}