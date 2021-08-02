import { Client as DiscordClient, Message, ClientEvents } from 'discord.js';
import { CommandMetadata } from '../metadata/CommandMetadata';
import { ListenerMetadata } from '../metadata/ListenerMetadata';
import { CommandOptions } from '../commandOptions';
import { Resolver } from '../injector';
import { FlagMetadata } from '../metadata/FlagMetadata';
import { BaseError } from '../errors/BaseError';
import { Listener, Action } from '../commands';

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
    const compiled = Resolver.resolve<Action>(command.target);
    this.client.on('message', async (message: Message): Promise<void> => {
      try {
        const trigger = this.getCommandTrigger(command);
        if (message.content.startsWith(trigger) && !this.checkForFlag(command.flags, trigger, message)) {
          if (command.auth) await command.auth.authenticate(message);
          const args = this.getCommandArgs(message, trigger);
          await compiled.run(message, args);
        }
        if (command.flags.length > 0) {
          await this.registerCommandFlags(command, message, trigger, compiled);
        }
      }
      catch (ex) {
        const error = ex as BaseError;
        message.reply(`\`\`\` ${error.name.toLocaleUpperCase()} \n ${error.message}\`\`\``);
      }
    });
  }

  registerListeners(listener: ListenerMetadata): void {
    const compiled = Resolver.resolve<Listener>(listener.target);
    this.client.on(listener.event, async (...args): Promise<void> => {
      try {
        const canRun = await compiled.listen(args as any);
        if (canRun) {
          await compiled.run(args as any);
        }
      }
      catch (ex) {
        const error = ex as BaseError;
        console.log(`\`\`\` ${error.name.toLocaleUpperCase()} \n ${error.message}\`\`\``);
      }
    });
  }

  start(): Promise<string> {
    return this.client.login(this.config.token);
  }

  private getCommandTrigger(command: CommandMetadata): string {
    return `${command.prefix}${command.target.name.toLowerCase()}`;
  }

  private async registerCommandFlags(command: CommandMetadata, message: Message, trigger: string, compiled: any): Promise<void> {
    for (let i = 0; i < command.flags.length; i++) {
      const flag = command.flags[i];
      const flagTrigger = this.getFlagTrigger(trigger, flag);
      if (message.content.startsWith(flagTrigger)) {
        if (command.auth) await command.auth.authenticate(message);
        else if (flag.auth) await flag.auth.authenticate(message);
        const args = this.getCommandArgs(message, flagTrigger);
        await compiled[flag.name](message, args);
      }
    }
  }

  private getCommandArgs(message: Message, trigger: string) {
    return message.content.slice(trigger.length).trim().split(' ');
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
