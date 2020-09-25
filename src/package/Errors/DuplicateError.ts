import { BaseError } from './BaseError';

export class DuplicateError extends BaseError {
  constructor() {
    super('A duplicate entry was added');
  }
}