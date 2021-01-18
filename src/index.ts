import { Client } from './client/client';
import { CommandController } from './CommandController';
import { CommandOptions } from './commandOptions';
import { MetadataStorage } from './metadata/MetadataStorage';
import { importClassesFromDirectories } from './utils/importClassesFromDirectories';

export * from './commandOptions';
export * from './CommandController';
export * from './metadata';
export * from './decorator';
export * from './client';
export * from './commands';
export * from './utils';
export * from './types';

export function getMetadataStorage(): MetadataStorage {
  if (!(global as any).metaDataStorage)
      (global as any).metaDataStorage = new MetadataStorage();

  return (global as any).metaDataStorage;
}

export function createServer(options: CommandOptions): Client {
  const client = new Client(options);
  return managerServer(client, options);
}

function managerServer(client: Client, options: CommandOptions): Client {
  createExecutor(client, options);
  return client;
}

function createExecutor(client: Client, options: CommandOptions) {
  let commandClasses: Function[] = [];
  if (options && options.commands && options.commands.length) {
    commandClasses = (options.commands as any[]).filter(command => command instanceof Function);
    const commandDirs = (options.commands as any[]).filter(command => typeof command === 'string');
    commandClasses.push(...importClassesFromDirectories(commandDirs));
  }

  let listenerClasses: Function[] = [];
  if (options && options.listeners && options.listeners.length) {
    listenerClasses = (options.listeners as any[]).filter(listener => listener instanceof Function);
    const listenerDirs = (options.listeners as any[]).filter(listener => typeof listener === 'string');
    listenerClasses.push(...importClassesFromDirectories(listenerDirs));
  }

  new CommandController(client).registerCommands(commandClasses);
}
