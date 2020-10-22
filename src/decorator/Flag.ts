import { getMetadataStorage } from '../'
import { FlagMetadataArgs } from '../metadata';

export function Flag(name?: string, options?: FlagMetadataArgs): Function {
  return function (object: Function, methodName: string) {
    getMetadataStorage().flags.push({
      target: object,
      method: name || methodName,
      options
    });
  }
}