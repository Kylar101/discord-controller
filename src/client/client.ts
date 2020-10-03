// import { ClientConfig } from './types';
import { Client as DiscordClient, Message } from 'discord.js';
import { CommandMetadata } from '../metadata/CommandMetadata';
import { CommandOptions } from '../commandOptions';

export class Client {
  private readonly config: CommandOptions;
  client: DiscordClient;

  constructor(config: CommandOptions) {
    this.config = config;
    this.client = new DiscordClient();
    this.client.once('ready', (): void => {
      console.log('ready');
    });
  }

  registerActionCommand(command: CommandMetadata): void {
    this.client.on('message', (message: Message): void => {
      if(message.content.startsWith(this.getCommandTrigger(command))) {
        console.log(command.target.name);
      }
    });
  }

  start(): Promise<string> {
    return this.client.login(this.config.token);
  }

  private getCommandTrigger(command: CommandMetadata): string {
    return `${command.prefix}${command.target.name.toLowerCase()}`;
  }
}