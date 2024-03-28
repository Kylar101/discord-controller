import { Client } from './client/client';
import { CommandController } from './CommandController';
import type { BotOptions } from './BotOptions';
import { MetadataStorage } from './metadata/MetadataStorage';
import { importClassesFromDirectories } from './utils/importClassesFromDirectories';

export * from './BotOptions';
export * from './CommandController';
export * from './metadata';
export * from './decorator';
export * from './client';
export * from './commands';
export * from './utils';
export * from './types';

declare global {
  var metaDataStorage: MetadataStorage;
}

export function getMetadataStorage(): MetadataStorage {
  if (!global.metaDataStorage) global.metaDataStorage = new MetadataStorage();

  return global.metaDataStorage;
}

export async function createServer(options: BotOptions): Promise<Client> {
  const client = new Client(options);
  return managerServer(client, options);
}

async function managerServer(
  client: Client,
  options: BotOptions,
): Promise<Client> {
  createExecutor(client, options);
  return client;
}

async function createExecutor(client: Client, options: BotOptions) {
  let commandClasses: Function[] = [];
  if (options?.commands?.length) {
    commandClasses = options.commands.filter(
      (command) => command instanceof Function,
    ) as Function[];
    const commandDirs = options.commands.filter(
      (command) => typeof command === 'string',
    ) as string[];
    commandClasses.push(...importClassesFromDirectories(commandDirs));
  }

  let listenerClasses: Function[] = [];
  if (options?.listeners?.length) {
    listenerClasses = options.listeners.filter(
      (listener) => listener instanceof Function,
    ) as Function[];
    const listenerDirs = options.listeners.filter(
      (listener) => typeof listener === 'string',
    ) as string[];
    listenerClasses.push(...importClassesFromDirectories(listenerDirs));
  }

  (
    await new CommandController(client, options).registerCommands(
      commandClasses,
    )
  )
    .resolveCommands()
    .registerListeners(listenerClasses);
}
