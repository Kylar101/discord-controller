import type { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import type { FlagMetadata } from './FlagMetadata';
import type { AuthMetadata } from './AuthMetadata';
import type { SubCommandMetadata } from './SubCommandMetadata';

export class CommandMetadata {
  target: Function;
  options: any;
  flags: FlagMetadata[];
  subCommands: SubCommandMetadata[];
  auth: AuthMetadata[];

  constructor(args: CommandMetaDataArgs) {
    this.target = args.target;
    this.options = args.options;
    this.flags = [];
    this.subCommands = [];
    this.auth = [];
  }
}
