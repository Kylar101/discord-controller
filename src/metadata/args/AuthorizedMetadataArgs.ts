import type { GuildMember } from 'discord.js';

export type AuthFunction = (value: GuildMember) => boolean;

export interface AuthorizedMetadataArgs {
  target: Function;
  method?: string;
  value: string | string[] | AuthFunction;
  options?: any;
}
