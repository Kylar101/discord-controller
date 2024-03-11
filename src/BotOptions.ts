export interface BotOptions {
  token: string;
  clientId: string;
  guildId: string;
  commands?: Function[] | string[];
  listeners?: Function[] | string[];
}
