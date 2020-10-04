import { getMetadataStorage } from '../';
import { ServiceMetadataArgs } from '../metadata/args/ServiceMetadataArgs';

export function Service(options?: ServiceMetadataArgs) {
  return function(target: Function): void {
    getMetadataStorage().services.push({
      target,
      options
    });
  };
}