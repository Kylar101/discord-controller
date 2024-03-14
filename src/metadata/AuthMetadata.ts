import { AuthorizedMetadataArgs, AuthFunction } from '../metadata/args/AuthorizedMetadataArgs';
import { UnauthorizedError } from '../errors/Unauthorized';
import { Interaction } from '../client';
import { GuildMember, GuildMemberRoleManager } from 'discord.js';

export class AuthMetadata {

  subCommand?: string;
  options: any;
  method: string | string[] | AuthFunction;

  constructor(args: AuthorizedMetadataArgs) {
    this.subCommand = args.method;
    this.options = args.options;
    this.method = args.value;
  }

  async authenticate(message: Interaction): Promise<boolean> {
    const author = message.member;
    const roles: GuildMemberRoleManager = author.roles as GuildMemberRoleManager;
    let isAuthorised = false;
    switch (typeof this.method) {
      case 'string':
        isAuthorised = roles.cache.some(r => [this.method].includes(r.name));
        break;
      case 'object':
        isAuthorised = roles.cache.some(r => (this.method as string[]).includes(r.name));
        break;
      case 'function':
        isAuthorised = this.method(author as GuildMember);
        break;
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
