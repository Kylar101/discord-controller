import { CommandMetaDataArgs } from './args/CommandMetadataArgs';
import { FlagMetadata } from './FlagMetadata';
import { AuthMetadata } from './AuthMetadata';
import { DEFAULT_PREFIX } from '../contants';

export class CommandMetadata {

  target: Function;
  prefix: string;
  options: any
  flags: FlagMetadata[];
  auth: AuthMetadata;

  constructor(args: CommandMetaDataArgs) {
    this.target = args.target;
    this.prefix = args.prefix || DEFAULT_PREFIX;
    this.options = args.options;
  }
}
