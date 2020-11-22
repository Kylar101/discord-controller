import { AuthorizedMetadataArgs, AuthFunction } from '../metadata/args/AuthorizedMetadataArgs';
import { UnauthorizedError } from '../errors/Unauthorized';
import { Message } from 'discord.js';

export class AuthMetadata {

  flag?: string;
  options: any;
  method: string|string[]|AuthFunction;

  constructor(args: AuthorizedMetadataArgs) {
    console.log(args);
    this.flag = args.method;
    this.options = args.options;
    this.method = args.value;
  }

  async authenticate(message: Message): Promise<boolean> {
    const author = message.member;
    let isAuthorised = false;
    switch (typeof this.method) {
      case 'string':
        isAuthorised = author.roles.cache.some(r => [this.method].includes(r.name));
        break;
      case 'object':
        isAuthorised = author.roles.cache.some(r => (this.method as string[]).includes(r.name));
        break;
      case 'function':
        isAuthorised = this.method(author);
        break
      default:
        isAuthorised = false;
        break;
    }
    if (!isAuthorised) {
      throw new UnauthorizedError('Not Authorised');
    }
    return isAuthorised;
  }
}
