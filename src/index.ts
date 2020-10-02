import { Client } from './client/client';
import { CommandController } from './CommandController';
import { CommandOptions } from './commandOptions';
import { MetadataStorage } from './metadata/MetadataStorage';
import { importClassesFromDirectories } from './utils/importClassesFromDirectories';

export function getMetadataStorage(): MetadataStorage {
  if (!(global as any).metaDataStorage)
      (global as any).metaDataStorage = new MetadataStorage();

  return (global as any).metaDataStorage;
}

export function createServer(options: CommandOptions): Client {
  const client = new Client(options);
  return managerServer(client, options);
}

export function managerServer(client: Client, options: CommandOptions): Client {
  createExecutor(client, options);
  return client;
}

export function createExecutor(client: Client, options: CommandOptions) {
  let commandClasses: Function[] = [];
  if (options && options.commands && options.commands.length) {
    commandClasses = (options.commands as any[]).filter(command => command instanceof Function);
    const commandDirs = (options.commands as any[]).filter(command => typeof command === 'string');
    commandClasses.push(...importClassesFromDirectories(commandDirs));
  }

  new CommandController(client).registerCommands(commandClasses);
}