import { getMetadataStorage } from '../';
import { SubCommandOptions } from '../metadata';

export function SubCommand(options: SubCommandOptions): Function {
  return function (object: Function, methodName: string) {
    getMetadataStorage().subCommands.push({
      target: object.constructor,
      method: options.name || methodName,
      options
    });
  };
}