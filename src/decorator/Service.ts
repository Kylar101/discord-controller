import { getMetadataStorage } from '../'

export function Service(options?: any) {
  return function(target: Function) {
    getMetadataStorage().services.push({
      target,
      options
    });
  }
}