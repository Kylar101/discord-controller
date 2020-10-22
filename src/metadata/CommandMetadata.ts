import { CommandMetaDataArgs } from './args/CommandMetadataArgs';

export class CommandMetadata {

  target: Function;
  prefix: string;
  options: any
  flags: any[];

  constructor(args: CommandMetaDataArgs) {
    this.target = args.target;
    this.prefix = args.prefix || '!'; //TODO create global constants
    this.options = args.options;
  }
}