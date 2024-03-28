import { getMetadataStorage } from '../';
import type { AuthFunction } from '../metadata/args/AuthorizedMetadataArgs';

export function Authorized(role: string): Function;

export function Authorized(roles: string[]): Function;

export function Authorized(method: AuthFunction): Function;

export function Authorized(
  value: string | string[] | AuthFunction,
  options?: any,
): Function {
  return (clsOrObject: Function, method?: string) => {
    getMetadataStorage().authorized.push({
      target: method ? clsOrObject.constructor : clsOrObject,
      value,
      method,
      options,
    });
  };
}
