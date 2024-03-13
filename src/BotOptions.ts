import { GatewayIntentBits } from 'discord.js';

export interface BotOptions {
  permissions: GatewayIntentBits[];
  token: string;
  clientId: string;
  guildId: string;
  commands?: Function[] | string[];
  listeners?: Function[] | string[];
}
