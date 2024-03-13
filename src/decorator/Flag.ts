import { getMetadataStorage } from '../';
import { FlagOptions } from '../metadata';

export function Flag(name: string, options: FlagOptions): Function {
  return function (object: Function, methodName: string, order: number) {
    getMetadataStorage().flags.push({
      target: object.constructor,
      method: methodName === 'run' ? 'default' : methodName,
      name,
      options,
      order
    });
  };
}