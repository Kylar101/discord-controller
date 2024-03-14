import { getMetadataStorage } from '../';
import { AuthFunction } from '../metadata/args/AuthorizedMetadataArgs';

export function Authorized(role: string): Function;

export function Authorized(roles: string[]): Function;

export function Authorized(method: AuthFunction): Function;

export function Authorized(value: string | string[] | AuthFunction, options?: any): Function {
  return function (clsOrObject: Function, method?: string) {
    getMetadataStorage().authorized.push({
      target: method ? clsOrObject.constructor : clsOrObject,
      value,
      method,
      options
    });
  };
}
