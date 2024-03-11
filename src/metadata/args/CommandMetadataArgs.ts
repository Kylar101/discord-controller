export interface CommandOptions {
  description: string;
}

export interface CommandMetaDataArgs {
  target: Function;
  prefix?: string;
  options: CommandOptions;
}