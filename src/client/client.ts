// import { ClientConfig } from './types';
import { Client as DiscordClient, Message } from 'discord.js';
import { CommandMetadata } from '../metadata/CommandMetadata';
import { CommandOptions } from '../commandOptions';
import { Resolver } from '../injector';
import { FlagMetadata } from '../metadata/FlagMetadata';

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
    const compiled = Resolver.resolve(command.target);
    this.client.on('message', (message: Message): void => {
      const trigger = this.getCommandTrigger(command);
      if (message.content.startsWith(trigger) && !this.checkForFlag(command.flags, trigger, message)) {
        compiled.run(message);
      }
      if (command.flags.length > 0) {
        this.registerCommandFlags(command.flags, message, trigger, compiled);
      }
    });
  }

  start(): Promise<string> {
    return this.client.login(this.config.token);
  }

  private getCommandTrigger(command: CommandMetadata): string {
    return `${command.prefix}${command.target.name.toLowerCase()}`;
  }

  private registerCommandFlags(flags: FlagMetadata[], message: Message, trigger: string, compiled: any): void {
    flags.forEach(flag => {
      if (message.content.startsWith(this.getFlagTrigger(trigger, flag))) {
        compiled[flag.name](message);
      }
    });
  }

  private getFlagTrigger(baseTrigger: string, flag: FlagMetadata): string {
    return `${baseTrigger} ${flag.name}`;
  }

  private checkForFlag(flags: FlagMetadata[], trigger: string, message: Message): boolean {
    const flagTriggers = flags.map(flag => `${trigger} ${flag.name}`);
    const reduce = flagTriggers.reduce((_val, cur) => {
      return message.content.includes(cur);
    }, false);
    return reduce;
  }
}