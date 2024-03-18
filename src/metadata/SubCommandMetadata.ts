import type { SubCommandMetaDataArgs, SubCommandOptions } from './args';
import type { AuthMetadata } from './AuthMetadata';

export class SubCommandMetadata {
  target: Function;
  name: string;
  options: SubCommandOptions;
  auth: AuthMetadata;

  constructor(args: SubCommandMetaDataArgs) {
    this.target = args.target;
    this.name = args.method;
    this.options = args.options;
  }
}
