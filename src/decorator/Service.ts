import { getMetadataStorage } from '../';
import type { ServiceMetadataArgs } from '../metadata/args/ServiceMetadataArgs';

export function Service(options?: ServiceMetadataArgs) {
  return (target: Function): void => {
    getMetadataStorage().services.push({
      target,
      options,
    });
  };
}
