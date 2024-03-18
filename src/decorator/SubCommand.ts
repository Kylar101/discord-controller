import { getMetadataStorage } from '../';
import type { SubCommandOptions } from '../metadata';

export function SubCommand(options: SubCommandOptions): Function {
  return (object: Function, methodName: string) => {
    getMetadataStorage().subCommands.push({
      target: object.constructor,
      method: options.name || methodName,
      options,
    });
  };
}
