export enum FlagType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Choice = 'choice',
}

export type FlagChoice = {
  name: string;
  value: string | number;
};

export interface FlagOptions {
  description: string;
  type: FlagType;
  maxLength?: number;
  minLength?: number;
  choices?: FlagChoice[];
}

export interface FlagMetadataArgs {
  target: Function;
  method: string;
  name: string;
  options: FlagOptions;
  order: number;
}
