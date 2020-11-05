import { BaseError } from './BaseError';

export class MemberNotFound extends BaseError {
  constructor(message: string) {
    super('MembersNotFound', message);
  }
}