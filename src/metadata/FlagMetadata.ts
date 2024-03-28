import type { FlagMetadataArgs, FlagOptions } from './args';
import type { AuthMetadata } from './AuthMetadata';

export class FlagMetadata {
  target: Function;
  name: string;
  method: string;
  options: FlagOptions;
  order: number;
  auth: AuthMetadata|undefined;

  constructor(args: FlagMetadataArgs) {
    this.target = args.target;
    this.name = args.name;
    this.method = args.method;
    this.options = args.options;
    this.order = args.order;
  }
}
