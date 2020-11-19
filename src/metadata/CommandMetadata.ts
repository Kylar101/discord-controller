import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { FlagMetadata } from './FlagMetadata';
import { DEFAULT_PREFIX } from '../contants';
import { GuildMember } from 'discord.js';

export class CommandMetadata {

  target: Function;
  prefix: string;
  options: any
  flags: FlagMetadata[];
  authorise: (value: GuildMember) => boolean;

  constructor(args: CommandMetaDataArgs) {
    this.target = args.target;
    this.prefix = args.prefix || DEFAULT_PREFIX;
    this.options = args.options;
  }
}
