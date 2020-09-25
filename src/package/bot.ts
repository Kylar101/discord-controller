import { BotOptions } from './types';
import { Client, Message } from 'discord.js';
import { CommandList, CommandFactory } from './commandFactory';

export class DiscordBot {

  private readonly _prefix: string;
  private readonly _token: string;
  private readonly _client: Client;


  public constructor(options: BotOptions) {
    this._token = options.token;
    this._prefix = options.prefix;
    this._client = new Client();
  }

  public start() {
    this._client.once('ready', () => {
      console.log('Ready');
    });

    this._client.on('message', this.handleCommands);

    this._client.login(this._token);
  }

  private handleCommands(message: Message) {
    const commands = CommandFactory.getCommands();

    commands.forEach(command => {
      if (message.content.startsWith(`${this.getPrefix(command)}${command.key}`)) {
        command.command(message);
      }
    });
  }

  private getPrefix(command: CommandList) {
    if (!command.prefix) {
      return this._prefix;
    }
    return command.prefix;
  }

}