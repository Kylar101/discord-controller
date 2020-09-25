export type BotOptions = {
  token: string,
  prefix: string
}

export interface Ctr<T> { new(...args: any[]): T; }
