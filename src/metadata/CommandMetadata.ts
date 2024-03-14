import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { FlagMetadata } from './FlagMetadata';
import { AuthMetadata } from './AuthMetadata';
import { SubCommandMetadata } from './SubCommandMetadata';

export class CommandMetadata {

  target: Function;
  options: any;
  flags: FlagMetadata[];
  subCommands: SubCommandMetadata[];
  auth: AuthMetadata[];

  constructor(args: CommandMetaDataArgs) {
    this.target = args.target;
    this.options = args.options;
  }
}
