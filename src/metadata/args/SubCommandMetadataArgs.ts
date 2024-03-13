export interface SubCommandOptions {
  name?: string;
  description: string;
}

export interface SubCommandMetaDataArgs {
  target: Function;
  options: SubCommandOptions;
  method: any;
}