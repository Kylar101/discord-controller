import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { FlagMetadata } from './FlagMetadata';
import { AuthMetadata } from './AuthMetadata';

export class CommandMetadata {

  target: Function;
  options: any;
  flags: FlagMetadata[];
  auth: AuthMetadata;

  constructor(args: CommandMetaDataArgs) {
    this.target = args.target;
    this.options = args.options;
  }
}
