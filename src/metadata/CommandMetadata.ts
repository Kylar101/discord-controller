import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { FlagMetadata } from './FlagMetadata';

export class CommandMetadata {

  target: Function;
  prefix: string;
  options: any
  flags: FlagMetadata[];

  constructor(args: CommandMetaDataArgs) {
    this.target = args.target;
    this.prefix = args.prefix || '!'; //TODO create global constants
    this.options = args.options;
  }
}