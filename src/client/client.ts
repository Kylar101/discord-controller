import {
  Client as DiscordClient,
  Events,
  GatewayIntentBits,
  type Message,
  SlashCommandBuilder,
  type SlashCommandSubcommandBuilder,
  type Interaction,
  ClientEvents,
} from 'discord.js';
import type { CommandMetadata } from '../metadata/CommandMetadata';
import type { ListenerMetadata } from '../metadata/ListenerMetadata';
import type { BotOptions } from '../BotOptions';
import { Resolver } from '../injector';
import type { FlagMetadata } from '../metadata/FlagMetadata';
import type { BaseError } from '../errors/BaseError';
import type { Listener, Action } from '../commands';
import type { CommandBuilder } from '../metadata/CommandBuilder';
import type { SubCommandMetadata } from '../metadata';
import { FlagType } from '../metadata';
import { UnauthorizedError } from '../errors/Unauthorized';

export class Client {
  private readonly config: BotOptions;
  client: DiscordClient;

  constructor(config: BotOptions) {
    this.config = config;
    this.client = new DiscordClient({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        ...config.permissions,
      ],
    });
    this.client.once(Events.ClientReady, (): void => {
      console.log('ready');
    });
  }

  registerActionCommand(command: CommandMetadata): CommandBuilder {
    const compiled = Resolver.resolve<Action>(command.target);
    const data = new SlashCommandBuilder()
      .setName(command.target.name.toLowerCase())
      .setDescription(command.options.description);
    if (command.subCommands.length === 0)
      this.registerFlags(data, command.flags);
    if (command.subCommands.length > 0)
      this.registerDefaultSubCommand(
        data,
        command,
        command.flags.filter((f) => f.method === 'default'),
      );
    this.registerSubCommands(
      data,
      command.subCommands,
      command.flags.filter((f) => f.method !== 'default'),
    );
    return {
      data,
      flags: command.flags,
      subCommands: command.subCommands,
      authentication: command.auth,
      async execute(interaction: Interaction, ...flags: any[]) {
        await compiled.run(interaction, ...flags);
      },
      compiled,
    };
  }

  private registerFlags(
    command: SlashCommandBuilder | SlashCommandSubcommandBuilder,
    flags: FlagMetadata[],
  ): void {
    for (const flag of flags) {
      const name = flag.name.toLowerCase();
      const description = flag.options.description;
      switch (flag.options.type) {
        case FlagType.String:
          command.addStringOption((option) =>
            option
              .setName(name)
              .setDescription(description)
              .setMaxLength(flag.options.maxLength!)
              .setMinLength(flag.options.minLength!)
              .setRequired(true),
          );
          break;
        case FlagType.Number:
          command.addNumberOption((option) =>
            option
              .setName(name)
              .setDescription(description)
              .setMaxValue(flag.options.maxLength!)
              .setMinValue(flag.options.minLength!)
              .setRequired(true),
          );
          break;
        case FlagType.Boolean:
          command.addBooleanOption((option) =>
            option.setName(name).setDescription(description).setRequired(true),
          );
          break;
        case FlagType.Choice:
          command.addStringOption((option) =>
            option
              .setName(name)
              .setDescription(description)
              .setRequired(true)
              .addChoices(
                ...flag.options?.choices?.map((choice) => ({
                  name: choice.name,
                  value: choice.value.toString(),
                })) || [],
              ),
          );
          break;
        default:
          break;
      }
    }
  }

  private registerDefaultSubCommand(
    builder: SlashCommandBuilder,
    command: CommandMetadata,
    flags: FlagMetadata[],
  ): void {
    builder.addSubcommand((subCommandBuilder) => {
      const sc = subCommandBuilder
        .setName('default')
        .setDescription(command.options.description);
      this.registerFlags(sc, flags);
      return sc;
    });
  }

  private registerSubCommands(
    command: SlashCommandBuilder,
    subCommands: SubCommandMetadata[],
    flags: FlagMetadata[],
  ): void {
    for (const subCommand of subCommands) {
      const name = subCommand.name.toLowerCase();
      const description = subCommand.options.description;
      const scFlags = flags.filter(
        (flag) => flag.method.toLowerCase() === name.toLowerCase(),
      );
      command.addSubcommand((subCommandBuilder) => {
        const sc = subCommandBuilder.setName(name).setDescription(description);
        this.registerFlags(sc, scFlags);
        return sc;
      });
    }
  }

  resolveCommands(command: CommandBuilder): void {
    this.client.on(
      Events.InteractionCreate,
      async (interaction: Interaction): Promise<void> => {
        if (!interaction.isCommand()) return;
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === command.data.name) {
          try {
            if (command.subCommands.length) {
              const subCommand = interaction.options.getSubcommand();
              if (subCommand === 'default') {
                const auth = command.authentication.find(
                  (auth) => !auth.subCommand,
                );
                if (auth) await auth.authenticate(interaction);
                const flags = command.flags
                  .filter((f) => f.method === 'default')
                  .sort(this.sortFlags)
                  .map(
                    (flag) =>
                      interaction.options.get(flag.name.toLowerCase())!.value,
                  );
                await command.execute(interaction, ...flags);
              } else {
                const auth = command.authentication.find(
                  (auth) => auth.subCommand!.toLowerCase() === subCommand,
                );
                if (auth) await auth.authenticate(interaction);
                const subCommandName = this.getSubcommandName(
                  subCommand,
                  command.subCommands,
                );
                const flags = command.flags
                  .filter((f) => f.method !== 'default')
                  .sort(this.sortFlags)
                  .map(
                    (flag) =>
                      interaction.options.get(flag.name.toLowerCase())!.value,
                  );
                await (command.compiled as any)[subCommandName](
                  interaction,
                  ...flags,
                );
              }
            } else {
              const auth = command.authentication.find(
                (auth) => !auth.subCommand,
              );
              if (auth) await auth.authenticate(interaction);
              const flags = command.flags
                .sort(this.sortFlags)
                .map(
                  (flag) =>
                    interaction.options.get(flag.name.toLowerCase())!.value,
                );
              await command.execute(interaction, ...flags);
            }
          } catch (error) {
            console.error(error);
            if (error instanceof UnauthorizedError) {
              await interaction.reply({
                content: error.message,
                ephemeral: true,
              });
              return;
            }
            if (interaction.replied || interaction.deferred) {
              await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
              });
            } else {
              await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
              });
            }
          }
        }
      },
    );
  }

  private getSubcommandName(
    subCommand: string,
    commands: SubCommandMetadata[],
  ): string {
    return commands.find((command) => command.name.toLowerCase() === subCommand)!
      .name;
  }

  private sortFlags(a: FlagMetadata, b: FlagMetadata) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  registerListeners(listener: ListenerMetadata): void {
    const compiled = Resolver.resolve<Listener>(listener.target);
    this.client.on(listener.event, async (...args): Promise<void> => {
      try {
        const canRun = await compiled.listen(args as any);
        if (canRun) {
          await compiled.run(args as any);
        }
      } catch (ex) {
        const error = ex as BaseError;
        console.log(
          `\`\`\` ${error.name.toLocaleUpperCase()} \n ${error.message}\`\`\``,
        );
      }
    });
  }

  start(): Promise<string> {
    return this.client.login(this.config.token);
  }

  // private async registerCommandFlags(command: CommandMetadata, message: Message, trigger: string, compiled: any): Promise<void> {
  // for (let i = 0; i < command.flags.length; i++) {
  // const flag = command.flags[i];
  // const flagTrigger = this.getFlagTrigger(trigger, flag);
  // if (message.content.startsWith(flagTrigger)) {
  // if (command.auth) await command.auth.authenticate(message);
  // else if (flag.auth) await flag.auth.authenticate(message);
  // const args = this.getCommandArgs(message, flagTrigger);
  // await compiled[flag.name](message, args);
  // }
  // }
  // }

  private getCommandArgs(message: Message, trigger: string) {
    return message.content.slice(trigger.length).trim().split(' ');
  }

  private getFlagTrigger(baseTrigger: string, flag: FlagMetadata): string {
    return `${baseTrigger} ${flag.name}`;
  }

  private checkForFlag(
    flags: FlagMetadata[],
    trigger: string,
    message: Message,
  ): boolean {
    const flagTriggers = flags.map((flag) => `${trigger} ${flag.name}`);
    const reduce = flagTriggers.reduce((_val, cur) => {
      if (_val) return _val;
      return message.content.includes(cur);
    }, false);
    return reduce;
  }
}
