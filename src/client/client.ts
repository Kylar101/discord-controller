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
    this.client.once('ready', () => {
      console.log('ready');
    });
  }

  registerActionCommand(command: CommandMetadata) {
    this.client.on('message', (message: Message) => {
      console.log('message', message.content, command.target.name);
      if(message.content.startsWith(this.getCommandTrigger(command))) {
        console.log(command.target.name);
      }
    });
  }

  start() {
    return this.client.login(this.config.token);
  }

  private getCommandTrigger(command: CommandMetadata) {
    return `${command.prefix}${command.target.name.toLowerCase()}`;
  }
}