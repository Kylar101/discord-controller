import { BotOptions } from './types';
import { Client, Message } from 'discord.js';
import { Command } from './command';
import { Resolver } from './injector';

export class DiscordBot {

  // private readonly _prefix: string;
  private readonly _token: string;
  private readonly _client: Client;
  private readonly _commands: Command[];

  public constructor(options: BotOptions, commands: any[]) {
    this._token = options.token;
    // this._prefix = options.prefix;
    this._client = new Client();
    this._commands = commands;
  }

  public start() {
    this._client.once('ready', () => {
      console.log('Ready');
    });

    this._client.on('message', this.handleCommands);
    console.log(this._commands);

    this._client.login(this._token);
  }

  private handleCommands(message: Message) {
    this._commands.forEach(command => {
      console.log(command);
      const builtCommand = Resolver.command(command);

      builtCommand.run(message);
    });

  }
}