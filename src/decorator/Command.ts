import { getMetadataStorage } from 'src'

export function Command(prefix?: string, options?: any): Function {
  return function (object: Function) {
    getMetadataStorage().commands.push({
      target: object,
      prefix,
      options
    });
  }
}