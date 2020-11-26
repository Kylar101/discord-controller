import { FlagMetadataArgs } from './args';
import { AuthMetadata } from './AuthMetadata';

export class FlagMetadata {

  target: Function;
  name: string;
  options: any;
  auth: AuthMetadata;

  constructor(args: FlagMetadataArgs) {
    this.target = args.target;
    this.name = args.method;
    this.options = args.options;
  }
}
