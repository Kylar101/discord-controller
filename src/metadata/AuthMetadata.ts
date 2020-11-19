import { GuildMember } from 'discord.js';

export class AuthMetadata {
  resolve(role: string) {
    return (member: GuildMember) => {

    };
  }

  resolve(roles: string[]) {
    return (member: GuildMember) => {

    };
  }
}
