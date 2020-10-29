import { BaseError } from './BaseError';

export class RoleNotFound extends BaseError {
  constructor(message: string) {
    super('RoleNotFound', message);
  }
}