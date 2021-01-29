export interface CommandOptions {
  token: string;
  commands?: Function[] | string[];
  listeners?: Function[] | string[];
}
