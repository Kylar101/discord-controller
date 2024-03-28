export interface CommandOptions {
  description: string;
}

export interface CommandMetaDataArgs {
  target: Function;
  options: CommandOptions;
}
