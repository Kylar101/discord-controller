import { FlagMetadataArgs } from './args';

export class FlagMetadata {

  target: Function;
  name: string;
  options: any;

  constructor(args: FlagMetadataArgs) {
    this.target = args.target;
    this.name = args.method;
    this.options = args.options;
  }
}