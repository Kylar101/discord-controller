import { Message } from 'discord.js';

export type CommandList = {
  command: (message: Message) => void,
  key: string,
  prefix?: string
}

export class CommandFactory {
  
  private static commandList: CommandList[] = [];

  public static registerCommand(command: CommandList) {
    this.commandList.push(command);
  }

  public static getCommands() {
    console.log(this.commandList.length)
    return this.commandList;
  }
}