import { REST, Routes } from 'discord.js';
import type { Client } from './client/client';
import type { BotOptions } from './BotOptions';
import type { CommandBuilder } from './metadata/CommandBuilder';
import { MetadataBuilder } from './metadata/MetadataBuilder';

export class CommandController {
  private metadataBuilder: MetadataBuilder;
  private buildCommands: CommandBuilder[] = [];

  constructor(
    private client: Client,
    private options: BotOptions,
  ) {
    this.metadataBuilder = new MetadataBuilder();
  }

  async registerCommands(classes?: Function[]): Promise<this> {
    const commands = this.metadataBuilder.buildCommandMetadata(classes);
    this.buildCommands = commands.map((command) =>
      this.client.registerActionCommand(command),
    );
    const data = this.buildCommands.map((command) => command.data.toJSON());
    const rest = new REST().setToken(this.options.token);
    try {
      console.log(`Registering ${data.length} commands`);
      const registered = (await rest.put(
        Routes.applicationGuildCommands(
          this.options.clientId,
          this.options.guildId,
        ),
        { body: data },
      )) as Record<string, string>[];
      console.log(`Successfully registered ${registered.length} commands`);
    } catch (err) {
      console.log('unable to register commands', JSON.stringify(err, null, 2));
    }
    return this;
  }

  resolveCommands(): this {
    this.buildCommands.map((command) => this.client.resolveCommands(command));
    return this;
  }

  registerListeners(classes?: Function[]): this {
    const listeners = this.metadataBuilder.buildListenerMetadata(classes);
    listeners.map((listener) => this.client.registerListeners(listener));
    return this;
  }
}
