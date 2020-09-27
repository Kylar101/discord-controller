import { ClientConfig } from './types';
import { Client as DiscordClient } from 'discord.js';

export class Client {
  private readonly config: ClientConfig;
  private readonly client: DiscordClient;

  constructor(config: ClientConfig) {
    this.config = config;
    this.client = new DiscordClient();
  }
}